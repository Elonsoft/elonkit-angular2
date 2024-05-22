import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  DestroyRef,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ESSidebarCommonAttrService, ESSidebarMenuService } from '../public-api';
import { resizeObserver } from 'projects/elonkit/src/utils/resize-observer';
import { BehaviorSubject } from 'rxjs';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'es-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrls: ['./sidebar-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ESSidebarItemComponent implements AfterViewInit, OnChanges {
  @ViewChild('sidebarItemButtonContainer') itemButtonContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('templateContainer') templateContainer!: ElementRef<HTMLDivElement>;

  @ContentChild('items') templateRef!: TemplateRef<any>;
  @ViewChild('tooltipHeader') tooltipHeader: ElementRef<HTMLDivElement>;
  @ViewChild('tootipChildrenContainer') tootipChildrenContainer: ElementRef<HTMLDivElement>;
  @ViewChild('itemButton') itemButton!: ElementRef<HTMLButtonElement>;

  @Input() icon = '';
  @Input() text = '';
  @Input() id?: string;

  @Input()
  get selected(): boolean {
    return this._selected;
  }
  set selected(value: BooleanInput) {
    this._selected = coerceBooleanProperty(value);
  }
  private _selected = false;

  @Input()
  get isExpandClickable(): boolean {
    return this._isExpandClickable;
  }
  set isExpandClickable(value: BooleanInput) {
    this._isExpandClickable = coerceBooleanProperty(value);
  }
  private _isExpandClickable = false;

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
  public buttonContainerWidth = 0;
  public buttonSecondaryActionGap = 3; // px

  private hasChildren = false;
  public hasChildren$ = new BehaviorSubject<boolean>(false);

  private isOpen = false;
  public isOpen$ = new BehaviorSubject<boolean>(false);

  private isNestedMenuOpen = false;
  public isNestedMenuOpen$ = new BehaviorSubject<boolean>(false);

  constructor(
    private destroyRef: DestroyRef,
    private cdr: ChangeDetectorRef,
    public menuService: ESSidebarMenuService,
    public cas: ESSidebarCommonAttrService
  ) {}

  public ngAfterViewInit(): void {
    this.behaviour = this.menuService.behaviour;

    resizeObserver(this.itemButtonContainer.nativeElement)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.buttonContainerWidth =
          this.itemButtonContainer.nativeElement.clientWidth +
          this.itemButtonContainer.nativeElement.offsetLeft +
          this.buttonSecondaryActionGap;
        this.cdr.detectChanges();
      });

    this.menuService.openedItems$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((openedItems) => {
      if (this.id) {
        this.isNestedMenuOpen = openedItems.includes(this.id);
        this.isNestedMenuOpen$.next(this.isNestedMenuOpen);
      }
    });

    this.cas.isOpen$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((isOpen) => {
      this.isOpen = isOpen;
      this.isOpen$.next(this.isOpen);
      this.cdr.detectChanges();
    });

    this.checkChildren();
    this.markTemplateButtons();

    new MutationObserver(() => {
      // If the nested elements change, we will run a check
      this.checkChildren();
      this.cdr.detectChanges();
    }).observe(this.templateContainer.nativeElement, { childList: true, subtree: true });
  }

  public ngOnChanges(): void {
    this.behaviour = this.menuService.behaviour;

    this.checkChildren();
    this.markTemplateButtons();
  }

  private checkChildren(): void {
    if (this.templateRef) {
      const templateElement = this.templateContainer.nativeElement;
      this.hasChildren = templateElement.hasChildNodes();
      this.hasChildren$.next(this.hasChildren);

      const childrenArr = Array.from(templateElement.children) as HTMLElement[];

      this.removeChildernMargin(childrenArr);
      this.operateNestedChildrenFocus(childrenArr);
    }
  }

  private removeChildernMargin(children: HTMLElement[]): void {
    children.map((el) => ((el.firstChild as HTMLElement).style.margin = '0px'));
  }

  private operateNestedChildrenFocus(children: HTMLElement[]): void {
    const enabledChildrenArr = children.filter((child) => child.querySelector('button:not(.es-sidebar-item__button_disabled)'));
    enabledChildrenArr.map((el) => ((el.querySelector('button') as HTMLElement).tabIndex = !this.isNestedMenuOpen ? -1 : 0));
  }

  // Mark nested buttons as a template-button for filter it then
  private markTemplateButtons(): void {
    if (!this.templateContainer) return;
    const templateButtons = Array.from(
      this.templateContainer.nativeElement.querySelectorAll('.es-sidebar-item__button')
    ) as HTMLElement[];
    templateButtons.forEach((btn) => btn.classList.add('template-button'));
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
    if (!this.hasChildren) return;

    const childrenArr = Array.from(this.tootipChildrenContainer.nativeElement.children) as HTMLElement[];

    if (this.tooltipHeader.nativeElement.querySelector('button')) {
      childrenArr.unshift(this.tooltipHeader.nativeElement);
    }

    const enabledChildrenArr = childrenArr.filter((child) =>
      child.querySelector('button:not(.es-sidebar-item__button_disabled)')
    );

    switch (event.key) {
      case 'ArrowDown':
        {
          this.selectedTooltipItemIndex = (this.selectedTooltipItemIndex + 1) % enabledChildrenArr.length;
          const nextButton = enabledChildrenArr[this.selectedTooltipItemIndex]?.querySelector('button') as HTMLButtonElement;

          if (nextButton) {
            nextButton.focus();
          }
        }
        break;
      case 'ArrowUp':
        {
          this.selectedTooltipItemIndex =
            (this.selectedTooltipItemIndex + enabledChildrenArr.length - 1) % enabledChildrenArr.length;
          const prevButton = enabledChildrenArr[this.selectedTooltipItemIndex]?.querySelector('button') as HTMLButtonElement;

          if (prevButton) {
            prevButton.focus();
          }
        }
        break;
      case 'ArrowLeft':
        {
          this.itemButton.nativeElement.focus();
        }
        break;
      case 'Tab':
        {
          this.selectedTooltipItemIndex = (this.selectedTooltipItemIndex + 1) % enabledChildrenArr.length;
          if (this.selectedTooltipItemIndex === 0) {
            const lastButton = enabledChildrenArr[enabledChildrenArr.length - 1]?.querySelector('button') as HTMLButtonElement;
            lastButton.blur();

            const container = document.querySelector('aside');

            if (container) {
              const buttons = Array.from(
                container.querySelectorAll(
                  '.es-sidebar-item__button:not(.template-button):not(.es-sidebar-item__button_disabled)'
                )
              ) as HTMLElement[];
              const currentButton = this.itemButton.nativeElement;
              const index = buttons.findIndex((button) => button === currentButton);

              buttons[index].dispatchEvent(new MouseEvent('mouseleave'));
              buttons[index + 1].focus();
              event.preventDefault();
            }
          }
        }
        break;
    }
  }

  public _onNestedMenuHover(event: MouseEvent): void {
    if (this.behaviour === 'hover' && this.id) {
      if (event.type === 'mouseenter') {
        this.menuService.openItem(this.id);
      } else {
        this.menuService.closeItem(this.id);
      }
      this.checkChildren();
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

    if (!this.isExpandClickable) {
      this._onNestedMenuClick(event);
    }
  }
}
