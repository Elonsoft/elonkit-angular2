import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ESSidebarMenuService } from '../public-api';
import { resizeObserver } from 'projects/elonkit/src/utils/resize-observer';
import { BehaviorSubject, Subscription } from 'rxjs';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'es-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrls: ['./sidebar-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ESSidebarItemComponent implements AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('sidebarItemButtonContainer') itemButtonContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('templateContainer', { static: false, read: ElementRef }) templateContainer!: ElementRef<HTMLDivElement>;

  @ContentChild('items') templateRef!: TemplateRef<any>;
  @ViewChild('tooltipHeader') tooltipHeader: ElementRef<HTMLDivElement>;
  @ViewChild('tootipChildrenContainer') tootipChildrenContainer: ElementRef<HTMLDivElement>;
  @ViewChild('itemButton') itemButton!: ElementRef<HTMLButtonElement>;

  @Input() icon = '';
  @Input() text = '';
  @Input() id?: string;
  @Input() color: 'default' | 'primary' | 'secondary' = 'default';

  @Input()
  get isOpen(): boolean {
    return this._isOpen;
  }
  set isOpen(value: BooleanInput) {
    this._isOpen = coerceBooleanProperty(value);
  }
  private _isOpen = false;

  @Input()
  get selected(): boolean {
    return this._selected;
  }
  set selected(value: BooleanInput) {
    this._selected = coerceBooleanProperty(value);
  }
  private _selected = false;

  @Input()
  get isExpandClicable(): boolean {
    return this._isExpandClicable;
  }
  set isExpandClicable(value: BooleanInput) {
    this._isExpandClicable = coerceBooleanProperty(value);
  }
  private _isExpandClicable = false;

  @Input()
  get inset(): boolean {
    return this._inset;
  }
  set inset(value: BooleanInput) {
    this._inset = coerceBooleanProperty(value);
  }
  private _inset = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
  }
  private _disabled = false;

  @Output() itemClick = new EventEmitter<void>();

  public behaviour: 'click' | 'hover' = 'click';
  public width$ = new BehaviorSubject<number>(0);

  private hasChildren = false;
  public hasChildren$ = new BehaviorSubject<boolean>(false);

  private isNestedMenuOpen = false;
  public isNestedMenuOpen$ = new BehaviorSubject<boolean>(false);

  private resizeSubscription!: Subscription;
  private openedItemsSubscription!: Subscription;

  constructor(public menuService: ESSidebarMenuService) {}

  public ngAfterViewInit(): void {
    this.behaviour = this.menuService.behaviour;

    this.resizeSubscription = resizeObserver(this.itemButtonContainer.nativeElement).subscribe(() => {
      this.width$.next(this.itemButtonContainer.nativeElement.clientWidth + this.itemButtonContainer.nativeElement.offsetLeft);
    });

    this.openedItemsSubscription = this.menuService.openedItems$.subscribe((openedItems) => {
      if (this.id) {
        this.isNestedMenuOpen = openedItems.includes(this.id);
        this.isNestedMenuOpen$.next(this.isNestedMenuOpen);
      }
    });

    this.checkChildren();

    const templateButtons = Array.from(
      this.templateContainer.nativeElement.querySelectorAll('.es-sidebar-item__button')
    ) as HTMLElement[];
    templateButtons.map((btn) => btn.classList.add('template-button')); // Mark nested buttons as a template-button for filter it then
  }

  public ngOnChanges(): void {
    this.behaviour = this.menuService.behaviour;

    this.checkChildren();
  }

  public ngOnDestroy(): void {
    this.resizeSubscription.unsubscribe();
    this.openedItemsSubscription.unsubscribe();
  }

  private checkChildren(): void {
    if (this.templateRef) {
      const templateElement = this.templateContainer.nativeElement;
      this.hasChildren = templateElement.hasChildNodes();
      this.hasChildren$.next(this.hasChildren);

      const childrenArr = Array.from(templateElement.children) as HTMLElement[];
      childrenArr.map((el) => ((el.firstChild as HTMLElement).style.margin = '0px'));

      const enabledChildrenArr = childrenArr.filter((child) =>
        child.querySelector('button:not(.es-sidebar-item__button_disabled)')
      );
      enabledChildrenArr.map((el) => ((el.querySelector('button') as HTMLElement).tabIndex = !this.isNestedMenuOpen ? -1 : 0));
    }
  }

  public selectedTooltipItemIndex = 0;

  public _onItemKeyDown(event: KeyboardEvent): void {
    if (!this.hasChildren || !this.tootipChildrenContainer) return;

    const childrenArr = Array.from(this.tootipChildrenContainer.nativeElement.children) as HTMLElement[];
    if (this.tooltipHeader.nativeElement.querySelector('button')) {
      childrenArr.unshift(this.tooltipHeader.nativeElement);
    }

    if (this.hasChildren && event.key === 'ArrowRight') {
      const childButton = childrenArr[0]?.querySelector('button') as HTMLButtonElement;
      childButton.focus();
    }
  }

  public _onTooltipKeydown(event: KeyboardEvent): void {
    const childrenArr = Array.from(this.tootipChildrenContainer.nativeElement.children) as HTMLElement[];

    if (this.tooltipHeader.nativeElement.querySelector('button')) {
      childrenArr.unshift(this.tooltipHeader.nativeElement);
    }

    const enabledChildrenArr = childrenArr.filter((child) =>
      child.querySelector('button:not(.es-sidebar-item__button_disabled)')
    );

    if (this.hasChildren && event.key === 'ArrowDown') {
      this.selectedTooltipItemIndex = (this.selectedTooltipItemIndex + 1) % enabledChildrenArr.length;
      const nextButton = enabledChildrenArr[this.selectedTooltipItemIndex]?.querySelector('button') as HTMLButtonElement;

      if (nextButton) {
        nextButton.focus();
      }
    }

    if (this.hasChildren && event.key === 'ArrowUp') {
      this.selectedTooltipItemIndex = (this.selectedTooltipItemIndex + enabledChildrenArr.length - 1) % enabledChildrenArr.length;
      const prevButton = enabledChildrenArr[this.selectedTooltipItemIndex]?.querySelector('button') as HTMLButtonElement;

      if (prevButton) {
        prevButton.focus();
      }
    }

    if (this.hasChildren && event.key === 'ArrowLeft') {
      this.itemButton.nativeElement.focus();
    }

    if (this.hasChildren && event.key === 'Tab') {
      this.selectedTooltipItemIndex = (this.selectedTooltipItemIndex + 1) % enabledChildrenArr.length;
      if (this.selectedTooltipItemIndex === 0) {
        const lastButton = enabledChildrenArr[enabledChildrenArr.length - 1]?.querySelector('button') as HTMLButtonElement;
        lastButton.blur();

        const container = document.querySelector('aside');

        if (container) {
          const buttons = Array.from(
            container.querySelectorAll('.es-sidebar-item__button:not(.template-button):not(.es-sidebar-item__button_disabled)')
          ) as HTMLElement[];
          const currentButton = this.itemButton.nativeElement;
          const index = buttons.findIndex((button) => button === currentButton);

          buttons[index].dispatchEvent(new MouseEvent('mouseleave'));
          buttons[index + 1].focus();
          event.preventDefault();
        }
      }
    }
  }

  public _onNestedMenuHover(event: MouseEvent): void {
    if (this.behaviour === 'hover' && this.id) {
      if (event.type === 'mouseenter') {
        this.menuService.openItem(this.id);
      } else {
        this.menuService.closeItem(this.id);
      }
    }
  }

  public _onNestedMenuClick(event: MouseEvent): void {
    if (this.disabled) return;

    if (this.isOpen && (this.behaviour === 'click' || event.detail === 0) && this.id) {
      if (this.isNestedMenuOpen) {
        this.menuService.closeItem(this.id);
      } else {
        this.menuService.openItem(this.id);
      }

      this.checkChildren();
    }
  }

  public _onItemTouchStart(event: TouchEvent): void {
    if (this.disabled) return;

    this.itemClick.emit();
    event.preventDefault();
  }

  public _onItemClick(event: MouseEvent): void {
    if (this.disabled) return;

    this.itemClick.emit();

    if (!this.isExpandClicable) {
      this._onNestedMenuClick(event);
    }
  }
}
