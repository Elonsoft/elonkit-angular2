import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'es-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ESSidebarComponent implements OnDestroy {
  @Input() color: 'default' | 'primary' | 'secondary' = 'default';
  @Input() maxWidth = 400;
  @Input() minWidth = 220;
  @Input() width = 280;
  @Input()
  get isOpen(): boolean {
    return this._isOpen;
  }
  set isOpen(value: BooleanInput) {
    this._isOpen = coerceBooleanProperty(value);
  }
  private _isOpen = false;

  @Output() widthChange = new EventEmitter<number>();
  @Output() widthChangeCommit = new EventEmitter<number>();

  public isMouseMove$ = new BehaviorSubject(false);
  public isMouseDown$ = new BehaviorSubject(false);

  public screenX: number | null = null;
  private initialWidth: number | null = null;

  private removeEventListeners: (() => void)[] = [];

  constructor(private renderer: Renderer2) {}

  public ngOnDestroy(): void {
    this.removeAllEventListeners();
  }

  @ViewChild('content', { static: true }) private content: ElementRef;

  public _onMouseDown(event: MouseEvent): void {
    if (event.button === 0 && this.isOpen) {
      this.screenX = event.screenX;
      this.isMouseDown$.next(true);
      this.initialWidth = this.content.nativeElement.getBoundingClientRect().width;

      this.removeEventListeners.push(
        this.renderer.listen('document', 'mousemove', this._onMouseMove.bind(this)),
        this.renderer.listen('document', 'mouseup', this._onMouseUp.bind(this))
      );
    }
  }

  public _onTouchStart(event: TouchEvent): void {
    if (this.isOpen) {
      this.screenX = event.touches[0].screenX;
      this.isMouseDown$.next(true);
      this.initialWidth = this.content.nativeElement.getBoundingClientRect().width;

      this.removeEventListeners.push(
        this.renderer.listen('document', 'touchmove', this._onTouchMove.bind(this)),
        this.renderer.listen('document', 'touchend', this._onTouchEnd.bind(this))
      );
    }
  }

  private _onMouseMove(event: MouseEvent): void {
    if (this.screenX !== null && this.initialWidth !== null && this.content.nativeElement) {
      const deltaX = event.screenX - this.screenX;
      const newWidth = this.initialWidth + deltaX;
      const clampedWidth = Math.min(this.maxWidth, Math.max(newWidth, this.minWidth));

      this.width = clampedWidth;
      this.widthChange.emit(clampedWidth);
    }

    this.isMouseMove$.next(true);
  }

  private _onTouchMove(event: TouchEvent): void {
    if (this.screenX !== null && this.initialWidth !== null && this.content.nativeElement) {
      const deltaX = event.touches[0].screenX - this.screenX;
      const newWidth = this.initialWidth + deltaX;
      const clampedWidth = Math.min(this.maxWidth, Math.max(newWidth, this.minWidth));

      this.width = clampedWidth;
      this.widthChange.emit(clampedWidth);
    }

    this.isMouseMove$.next(true);
  }

  private _onMouseUp(): void {
    this.finalizeResize();
  }

  private _onTouchEnd(): void {
    this.finalizeResize();
  }

  private finalizeResize(): void {
    if (this.initialWidth !== null && this.content.nativeElement) {
      this.widthChangeCommit.emit(Math.ceil(this.content.nativeElement.getBoundingClientRect().width));
    }

    this.isMouseMove$.next(false);
    this.isMouseDown$.next(false);
    this.screenX = null;
    this.initialWidth = null;

    this.removeAllEventListeners();
  }

  private removeAllEventListeners() {
    this.removeEventListeners.forEach((removeListener) => removeListener());
    this.removeEventListeners = [];
  }
}
