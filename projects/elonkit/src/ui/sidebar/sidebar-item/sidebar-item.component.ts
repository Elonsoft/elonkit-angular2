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
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ESSidebarMenuService } from '../public-api';
import { resizeObserver } from 'projects/elonkit/src/utils/resize-observer';
import { BehaviorSubject, Subscription } from 'rxjs';

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
  @Input() isOpen = false;
  @Input() color: 'default' | 'primary' | 'secondary' = 'default';
  @Input() selected = false;
  @Input() isExpandClicable = false;
  @Input() inset = false;

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
      console.log(this.templateRef);
      const templateElement = this.templateContainer.nativeElement;
      this.hasChildren = templateElement.hasChildNodes();
      this.hasChildren$.next(this.hasChildren);
      const childrenArr = Array.from(templateElement.children) as HTMLElement[];

      childrenArr.forEach((el: HTMLElement) => {
        (el.firstChild as HTMLElement).style.margin = '0px';

        const elementButton = el.firstChild?.firstChild?.firstChild as HTMLElement;

        if (!this.isNestedMenuOpen) {
          elementButton.tabIndex = -1;
        } else {
          elementButton.tabIndex = 0;
        }
      });
    }
  }

  public selectedTooltipItemIndex = 0;

  public _onItemKeyDown(event: KeyboardEvent): void {
    if (!this.hasChildren) return;

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

    if (this.hasChildren && event.key === 'ArrowDown') {
      this.selectedTooltipItemIndex = (this.selectedTooltipItemIndex + 1) % childrenArr.length;
      const nextButton = childrenArr[this.selectedTooltipItemIndex]?.querySelector('button') as HTMLButtonElement;

      if (nextButton) {
        nextButton.focus();
      }
    }

    if (this.hasChildren && event.key === 'ArrowUp') {
      this.selectedTooltipItemIndex = (this.selectedTooltipItemIndex + childrenArr.length - 1) % childrenArr.length;
      const prevButton = childrenArr[this.selectedTooltipItemIndex]?.querySelector('button') as HTMLButtonElement;

      if (prevButton) {
        prevButton.focus();
      }
    }

    if (this.hasChildren && event.key === 'ArrowLeft') {
      this.itemButton.nativeElement.focus();
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
    this.itemClick.emit();
    event.preventDefault();
  }

  public _onItemClick(event: MouseEvent): void {
    this.itemClick.emit();

    if (!this.isExpandClicable) {
      this._onNestedMenuClick(event);
    }
  }
}
