import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
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
  @ViewChild('sidebarItemButtonContainer') itemButtonContainer: ElementRef<HTMLDivElement>;
  @ViewChild('contentContainer', { static: false }) contentContainer: ElementRef<HTMLDivElement>;

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

  public isTooltipOpen = false;
  private shouldSkipClick = false;
  private resizeSubscription!: Subscription;
  private openedItemsSubscription!: Subscription;

  constructor(public menuService: ESSidebarMenuService) {}

  public ngAfterViewInit(): void {
    console.log('init');
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

  public ngOnChanges(changes: SimpleChanges): void {
    this.behaviour = this.menuService.behaviour;

    this.checkChildren();
  }

  public ngOnDestroy(): void {
    this.resizeSubscription.unsubscribe();
    this.openedItemsSubscription.unsubscribe();
  }

  private checkChildren(): void {
    if (this.contentContainer) {
      const contentElement = this.contentContainer.nativeElement;
      this.hasChildren = contentElement.hasChildNodes();
      this.hasChildren$.next(this.hasChildren);
      const childrenArr = Array.from(contentElement.children) as HTMLElement[];

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

  public _onItemKeyDown(event: KeyboardEvent): void {
    if (this.hasChildren && event.key === 'ArrowRight') {
      console.log(event.key);
      // TODO: focus on first tooltip item
    }

    this.itemClick.emit();
  }

  public _onNestedMenuClick(event: MouseEvent): void {
    if (this.hasChildren && !this.isTooltipOpen) {
      event.preventDefault();
    }

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
    if (!this.isOpen && !this.isTooltipOpen && this.hasChildren) {
      console.log('skip');
      this.shouldSkipClick = true;
    }
  }

  public _onItemClick(event: MouseEvent): void {
    if (this.shouldSkipClick) {
      this.shouldSkipClick = false;
      event.preventDefault();
      return;
    }

    this.itemClick.emit();

    if (!this.isExpandClicable) {
      this._onNestedMenuClick(event);
    }
  }
}
