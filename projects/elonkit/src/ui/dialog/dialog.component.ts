import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'es-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, AfterViewInit {

  /**
   * @ignore
   */
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(evt: KeyboardEvent) {
    if (!this.disableEscapeKeyDown) {
      this.hide();
    }
  }

  /**
   * @ignore
   */
  @ViewChild('content', { static: false })
  content: ElementRef | undefined;

  @Input()
  maxWidth: string = '700px';

  @Input()
  align: 'start' | 'center' | 'end' = 'center';

  @Input()
  fullWidth: boolean = false;

  @Input()
  fullScreen: boolean = false;

  @Input()
  disableEscapeKeyDown: boolean = false;

  @Input()
  hideBackdrop: boolean = false;

  @Input()
  transitionDuration: number = 400;

  /**
   * @ignore
   */
  @Input()
  showModal: boolean = false;

  /**
   * @ignore
   */
  @Output()
  onClose: EventEmitter<any> = new EventEmitter<any>();

  /**
   * @ignore
   */
  isTopScroll: boolean = true;

  /**
   * @ignore
   */
  isBottomScroll: boolean = false;

  /**
   * @ignore
   */
  isScroll: boolean = false;

  /**
   * @ignore
   */
  ngOnInit(): void {
    this.maxWidth = this.fullWidth ? '100%' : this.maxWidth
  }

  /**
   * @ignore
   */
  hide() {
    this.showModal = false;
    setTimeout(() => {
      this.onClose.emit();
    }, this.transitionDuration - 20)

  }

  /**
   * @ignore
   */
  clickOut($event: MouseEvent) {
    if(!this.content?.nativeElement.contains($event.target)) {
      this.hide();
    }
  }

  /**
   * @ignore
   */
  onScroll(event: any) {
    const elementHeight = this.content?.nativeElement.clientHeight;
    this.isTopScroll = event.target.scrollHeight - elementHeight > event.target.scrollTop;
    this.isBottomScroll = event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight;
  }

  /**
   * @ignore
   */
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.isScroll = this.content?.nativeElement.clientHeight > document.documentElement.scrollHeight;
      this.isBottomScroll = !(this.content?.nativeElement.clientHeight > document.documentElement.scrollHeight);
    })

  }
}
