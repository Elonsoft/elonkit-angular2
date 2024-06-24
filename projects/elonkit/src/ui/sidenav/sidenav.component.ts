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
  Renderer2,
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
  private activeId = '';

  @ViewChild('rail') railElement: ElementRef;
  @ViewChild('drawer') drawerElement: ElementRef; // если закрыт, давать display: none

  @HostListener('document:keydown', ['$event'])
  _onDocumentKeydown(event: KeyboardEvent): void {
    if (this.isOpen && event.code === 'Escape') {
      this.isOpen = false;
      this.isOpen$.next(this.isOpen);
      this.closeEvent.emit(false);
    }
  }

  constructor(
    private ss: ESSidenavService,
    private renderer: Renderer2
  ) {}

  public ngAfterViewInit(): void {
    const nestedRailSidebar = this.railElement.nativeElement.children[0];
    if (nestedRailSidebar) {
      nestedRailSidebar.style.position = 'absolute';
      nestedRailSidebar.style.height = '100%';
      nestedRailSidebar.querySelector('.es-sidebar__handler').style.display = 'none';
    }

    const nestedSidebarMenu = this.railElement.nativeElement.querySelectorAll('es-sidebar-menu');

    nestedSidebarMenu.forEach((menuItem: HTMLElement) => {
      this.renderer.listen(menuItem, 'mouseleave', () => {
        const items = menuItem.querySelectorAll('es-sidenav-item') as NodeListOf<HTMLElement>;

        let drawerClosed = false;
        items.forEach((item) => {
          if (item.hasAttribute('id') && !drawerClosed) {
            this.ss.closeDrawer();
            drawerClosed = true;
          }
        });
      });
    });

    this.sidebarServiceSubscription = this.ss.openedDrawer$.subscribe((drawerId) => {
      this.selectedPageEvent.emit(drawerId);
      if (drawerId) {
        this.activeId = drawerId;
        this.isOpen = true;
        this.isOpen$.next(this.isOpen);
        // здесь вызывать будущий сервис, отвечающий за открытие сайдбара, который передает isopen между элементами сайдбара;
        // Пока привязка сделана через emit
      } else {
        this.isOpen = false;
        this.isOpen$.next(this.isOpen);

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

  public _onMouseEnter(): void { // Для удержания drawer в открытом состоянии
    this.ss.openDrawer(this.activeId);
  }

  public _onMouseLeave(): void { // Для закрытия drawer, если юзер увел с него курсор
    this.ss.closeDrawer();
  }
}
