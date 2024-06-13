import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'es-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ESSidenavComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() disableEscapeKeyDown = false;
  @Input() disableItemHover = false;
  @Input() isOpen = false;
  public isOpen$ = new BehaviorSubject<boolean>(false);
  @Input() isHover = false;
  @Output() closeEvent = new EventEmitter<void>();

  @HostListener('keypress', ['$event.target'])
  _onKeyDown(event: any): void {
    console.log(event);
  }

  private removeEventListeners: (() => void)[] = [];

  constructor(private renderer: Renderer2) {}

  public ngAfterViewInit(): void {
    this.removeEventListeners.push(
      this.renderer.listen('document', 'keydown', (event) => {
        if (event.code === 'Escape') {
          console.log('close sidenav');
          this.isOpen$.next(false);
        }
      })
    );
  }

  public ngOnChanges(): void {
    this.isOpen$.next(this.isOpen);
  }

  public ngOnDestroy(): void {
    this.removeAllEventListeners();
  }

  private removeAllEventListeners() {
    this.removeEventListeners.forEach((removeListener) => removeListener());
    this.removeEventListeners = [];
  }
}
