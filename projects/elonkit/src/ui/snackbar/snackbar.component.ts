import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ISnackbarData, USnackbarSize } from './snackbar.types';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  templateUrl: './snackbar.component.html',
  styleUrls: ['snackbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  providers: [],
})
export class ESSnackbarComponent implements AfterViewInit {
  @ViewChild('progressWrapper', { static: true }) progressWrapperElement!: ElementRef;
  public progress$ = new BehaviorSubject(0);
  private animationFrameId = 0;
  private startTime = 0;
  public size: USnackbarSize;
  public matIcon?: string;

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: ISnackbarData,
    private snackbarRef: MatSnackBarRef<ESSnackbarComponent>
  ) {
    this.size = data.size || 'm';
    this.matIcon = data.matIcon;
  }

  public ngAfterViewInit(): void {
    this.startProgressAnimation(this.data.dismissAfter || 0);
  }

  public onDismiss() {
    cancelAnimationFrame(this.animationFrameId);
    this.snackbarRef.dismiss();
  }

  public onAction() {
    if (this.data.callback) {
      this.data.callback();
    }
  }

  public startProgressAnimation(ms: number) {
    const loaderWrapperWidth = this.progressWrapperElement.nativeElement.offsetWidth;

    const animate = (timestamp: number) => {
      if (!this.startTime) {
        this.startTime = timestamp;
      }

      const elapsedTime = timestamp - this.startTime;
      const progress = Math.min(1, elapsedTime / ms);
      this.progress$.next(progress * loaderWrapperWidth);

      if (progress < 1) {
        this.animationFrameId = requestAnimationFrame(animate);
      }

      if (progress >= 1) {
        cancelAnimationFrame(this.animationFrameId);
        this.snackbarRef.dismiss();
      }
    };

    this.animationFrameId = requestAnimationFrame(animate);
  }
}
