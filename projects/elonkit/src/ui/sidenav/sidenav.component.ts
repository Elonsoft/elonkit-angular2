import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ESSidenavService } from './sidenav.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { getInnerFocusableElement } from '../../cdk/a11y/focusable';

@Component({
  selector: 'es-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('hideShow', [
      state('hidden', style({ transform: 'translateX(-100%)', left: '-57px', display: 'none' })),
      state('visible', style({ transform: 'translateX(0)', left: '57px', display: 'block' })),
      transition('visible => hidden', [
        animate('0.2s ease', style({ transform: 'translateX(-100%)', left: '-57px' })),
        animate('0.2s', style({ display: 'none' })),
      ]),
      transition('hidden => visible', [
        style({ display: 'block' }),
        animate('0.2s ease', style({ transform: 'translateX(0)', left: '57px' })),
      ]),
    ]),
  ],
})
export class ESSidenavComponent implements AfterViewInit, OnChanges {
  @Input() disableEscapeKeyDown = false;
  @Input() disableItemHover = false;
  @Input() isOpen = false;
  public isOpen$ = new BehaviorSubject<boolean>(false);
  @Input() isHover = false;
  public isHover$ = new BehaviorSubject<boolean>(false);
  @Output() selectedPageEvent = new EventEmitter<string | null>();
  @Output() closeEvent = new EventEmitter<boolean>(false);

  private activeId = '';

  @ViewChild('rail') railElement: ElementRef;

  @HostListener('document:keydown', ['$event'])
  _onDocumentKeydown(event: KeyboardEvent): void {
    if (this.isOpen && !this.disableEscapeKeyDown && event.code === 'Escape') {
      this.isOpen = false;
      this.isOpen$.next(this.isOpen);
      this.closeEvent.emit(false);
    }
  }

  constructor(
    private ss: ESSidenavService,
    private renderer: Renderer2,
    private destroyRef: DestroyRef
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

    this.ss.openedDrawer$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((drawerId) => {
      if (!this.disableItemHover) {
        this.selectedPageEvent.emit(drawerId);
      }

      if (this.isOpen) return;

      if (drawerId) {
        this.activeId = drawerId;
        this.isHover = true;
        this.isHover$.next(this.isHover);
      } else {
        this.isHover = false;
        this.isHover$.next(this.isHover);
      }
    });

    this.ss.selectedPage$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((selectedId) => {
      this.selectedPageEvent.emit(selectedId);
    });
  }

  public ngOnChanges(): void {
    this.isOpen$.next(this.isOpen);
    this.isHover$.next(this.isHover);
  }

  public _onMouseEnter(): void {
    // Для удержания drawer в открытом состоянии

    if (this.isOpen) return;
    this.ss.openDrawer(this.activeId);
  }

  public _onMouseLeave(): void {
    // Для закрытия drawer, если юзер увел с него курсор
    if (this.isOpen) return;
    this.ss.closeDrawer();
  }

  public _onBackdropClick(): void {
    this.ss.closeDrawer();
  }

  public _onKeyDown(event: KeyboardEvent): void {
    if (event.key !== 'ArrowLeft') return;

    const currentSidenavItem = document.getElementById(this.activeId);
    if (!currentSidenavItem) return;
    const currentFocusableButton = getInnerFocusableElement(currentSidenavItem);
    currentFocusableButton.focus();
  }
}
