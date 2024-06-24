import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ESSidebarCommonAttrService } from './sidebar-common-attr.service';

@Component({
  selector: 'es-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [ESSidebarCommonAttrService],
})
export class ESSidebarComponent implements OnChanges, OnDestroy {
  @ViewChild('content', { static: true }) private content: ElementRef;

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

  constructor(
    private renderer: Renderer2,
    private cas: ESSidebarCommonAttrService
  ) {
    this.cas.color = this.color;
  }

  public ngOnChanges(): void {
    this.cas.setColor(this.color);
    this.cas.operateOpenState(this.isOpen);
  }

  public ngOnDestroy(): void {
    this.removeAllEventListeners();
  }

  public _onMouseDown(event: MouseEvent): void {
    this.startResize(event.button === 0, event.screenX);
  }

  public _onTouchStart(event: TouchEvent): void {
    this.startResize(true, event.touches[0].screenX);
  }

  private startResize(isPrimaryButton: boolean, screenX: number): void {
    if (isPrimaryButton && this.isOpen) {
      this.screenX = screenX;
      this.isMouseDown$.next(true);
      this.initialWidth = this.content.nativeElement.getBoundingClientRect().width;

      this.removeEventListeners.push(
        this.renderer.listen('document', 'mousemove', this._onMouseMove.bind(this)),
        this.renderer.listen('document', 'mouseup', this._onMouseUp.bind(this)),
        this.renderer.listen('document', 'touchmove', this._onTouchMove.bind(this)),
        this.renderer.listen('document', 'touchend', this._onTouchEnd.bind(this))
      );
    }
  }

  private _onMouseMove(event: MouseEvent): void {
    this.handleMove(event.screenX);
  }

  private _onTouchMove(event: TouchEvent): void {
    this.handleMove(event.touches[0].screenX);
  }

  private handleMove(currentScreenX: number): void {
    if (this.screenX !== null && this.initialWidth !== null) {
      const deltaX = currentScreenX - this.screenX;
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
