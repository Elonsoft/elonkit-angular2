import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  ViewChild,
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
export class ESSidenavComponent implements AfterViewInit, OnChanges {
  @Input() disableEscapeKeyDown = false;
  @Input() disableItemHover = false;
  @Input() isOpen = false;
  public isOpen$ = new BehaviorSubject<boolean>(false);
  @Input() isHover = false;
  public isHover$ = new BehaviorSubject<boolean>(false);
  @Output() closeEvent = new EventEmitter<boolean>(false);

  @ViewChild('rail') railElement: ElementRef;

  @HostListener('document:keydown', ['$event'])
  _onDocumentKeydown(event: KeyboardEvent): void {
    if (this.isOpen && event.code === 'Escape') {
      this.isOpen = false;
      this.isOpen$.next(this.isOpen);
      this.closeEvent.emit(false);
    }
  }


  constructor() {}

  public ngAfterViewInit(): void {
    // console.log(this.railElement.nativeElement.children);
    const nestedSidebar = this.railElement.nativeElement.children[0];
    if (nestedSidebar) {
      nestedSidebar.style.position = 'absolute';
      nestedSidebar.style.height = '100%';

      (nestedSidebar.querySelectorAll('es-sidenav-item')).forEach((element: HTMLElement, index: number) => {
        element.id = String(index);
      });
    }
  }

  public ngOnChanges(): void {
    this.isOpen$.next(this.isOpen);
    this.isHover$.next(this.isHover);
  }

  public _onMouseEnter(event: MouseEvent): void {
    const items = (event.target as HTMLElement).querySelectorAll('es-sidenav-item');
    // console.log(items);
  }

  public _onMouseLeave(event: MouseEvent): void {
    // console.log('leave', event);
  }
}
