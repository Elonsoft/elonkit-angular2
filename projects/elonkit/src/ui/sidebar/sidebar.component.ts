import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'es-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ESSidebarComponent {
  @Input() color: 'default' | 'primary' | 'secondary' = 'default';
  @Input() maxWidth = 400;
  @Input() minWidth = 220;
  @Input() isOpen = false;
  @Input() width = 280;

  @Output() widthChange = new EventEmitter<number>();
  @Output() widthChangeCommit = new EventEmitter<number>();

  public isMouseMove = false;
  public isMouseDown = false;

  public screenX: number | null = null;
  public isActive: boolean | null = null;
  // public onMouseMove: (event: any) => void | null = null;

  constructor(
    private renderer: Renderer2,
    private cd: ChangeDetectorRef
  ) {}

  @HostListener('window:resize')
  _onResize(): void {
    // console.log('resize', this.content.nativeElement.clientWidth)
  }

  @ViewChild('content', { static: true }) private content: ElementRef;

  public _onMouseDown(event: MouseEvent): void {
    if (event.button === 0 && this.isOpen) {
      this.screenX = event.screenX;
      this.isMouseDown = true;

      this.renderer.listen('document', 'mousemove', this._onMouseMove.bind(this));
      this.renderer.listen('document', 'mouseup', this._onMouseUp.bind(this));
    }
  }

  public _onTouchStart(event: TouchEvent): void {
    if (this.isOpen) {
      this.screenX = event.touches[0].screenX;
      this.isMouseDown = true;
      // this.isActive = true;

      this.renderer.listen('document', 'touchmove', this._onTouchMove.bind(this));
      this.renderer.listen('document', 'touchend', this._onTouchEnd.bind(this));
    }
  }

  private _onMouseMove(event: MouseEvent): void {
    if (this.screenX !== null && this.content.nativeElement) {
      const width = this.content.nativeElement.getBoundingClientRect().width + (event.screenX - this.screenX);
      console.log(Math.min(this.maxWidth, Math.max(width, this.minWidth)));

      this.content.nativeElement.style.width = `${Math.min(this.maxWidth, Math.max(width, this.minWidth))}px`;
      this.widthChange.emit(width);
      // this.screenX = event.screenX; // ?
    }

    this.isMouseMove = true;
  }

  private _onTouchMove(event: TouchEvent): void {
    if (this.screenX !== null && this.content.nativeElement) {
      const width = this.content.nativeElement.getBoundingClientRect().width + (event.touches[0].screenX - this.screenX);

      // this.content.nativeElement.style.width = `${Math.min(this.maxWidth, Math.max(width, this.minWidth))}px`;
      this.widthChange.emit(width);
      // this.screenX = event.touches[0].screenX; // ?
    }
  }

  private _onMouseUp(): void {
    this.finalizeResize();
  }

  private _onTouchEnd(): void {
    this.finalizeResize();
  }

  private finalizeResize(): void {
    if (this.screenX !== null && this.content.nativeElement) {
      this.widthChangeCommit.emit(Math.ceil(this.content.nativeElement.getBoundingClientRect().width));
    }
    this.isMouseMove = false;
    this.isMouseDown = false;
    this.screenX = null;
    this.cd.detectChanges();
  }
}
