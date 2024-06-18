import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ESSidenavService } from './sidenav.service';

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
  public isHover$ = new BehaviorSubject<boolean>(false);
  @Output() selectedPageEvent = new EventEmitter<string | null>();
  @Output() closeEvent = new EventEmitter<boolean>(false);

  private sidebarServiceSubscription!: Subscription;

  @ViewChild('rail') railElement: ElementRef;

  @HostListener('document:keydown', ['$event'])
  _onDocumentKeydown(event: KeyboardEvent): void {
    if (this.isOpen && event.code === 'Escape') {
      this.isOpen = false;
      this.isOpen$.next(this.isOpen);
      this.closeEvent.emit(false);
    }
  }

  constructor(private ss: ESSidenavService) {}

  public ngAfterViewInit(): void {
    // console.log(this.railElement.nativeElement.children);
    const nestedSidebar = this.railElement.nativeElement.children[0];
    if (nestedSidebar) {
      nestedSidebar.style.position = 'absolute';
      nestedSidebar.style.height = '100%';
    }

    this.sidebarServiceSubscription = this.ss.openedDrawer$.subscribe((drawerId) => {
      this.selectedPageEvent.emit(drawerId);
      if (drawerId) {
        console.log(drawerId);
        this.isOpen = true;
        this.isOpen$.next(this.isOpen);
        // здесть вызывать будущий сервис, отвечающий за открытие сайдбара;
      } else {
        console.log('close');
      }
    });
  }

  public ngOnChanges(): void {
    this.isOpen$.next(this.isOpen);
    this.isHover$.next(this.isHover);
  }

  public ngOnDestroy(): void {
    this.sidebarServiceSubscription.unsubscribe();
  }

  public _onMouseEnter(event: MouseEvent): void {
    // console.log(items);
  }

  public _onMouseLeave(event: MouseEvent): void {
    // console.log('leave', event);
  }
}
