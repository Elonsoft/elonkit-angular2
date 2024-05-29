import {
  AfterContentInit,
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
  ViewChildren,
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
  @Input() inset = false;

  @Output() itemClick = new EventEmitter<void>();

  public behaviour: 'click' | 'hover' = 'click';
  public width$ = new BehaviorSubject<number>(0);

  private hasChildren = false;
  public hasChildren$ = new BehaviorSubject<boolean>(false);

  private isNestedMenuOpen = false;
  public isNestedMenuOpen$ = new BehaviorSubject<boolean>(false);

  public isTooltipOpen = false;
  private resizeSubscription!: Subscription;
  private openedItemsSubscription!: Subscription;

  // TODO: Добавить открытие на hover и сокрытие кнопки развернуть (behavior) и убрать фокусировку (уточнить по component)

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
  }

  public ngOnChanges(changes: SimpleChanges): void {
    console.log('changes');
    this.behaviour = this.menuService.behaviour;

    if (this.contentContainer) {
      const contentElement = this.contentContainer.nativeElement;
      this.hasChildren = contentElement.hasChildNodes();
      this.hasChildren$.next(this.hasChildren);
      const childrenArr = Array.from(contentElement.children) as HTMLElement[];

      childrenArr.forEach((el: HTMLElement) => {
        (el.firstChild as HTMLElement).style.margin = '0px';
      });
    }
  }

  public ngOnDestroy(): void {
    this.resizeSubscription.unsubscribe();
    this.openedItemsSubscription.unsubscribe();
  }

  public onNestedMenuClick(event: MouseEvent): void {
    if (this.hasChildren && !this.isTooltipOpen) {
      event.preventDefault();
    }

    if (this.isOpen && (this.behaviour === 'click' || event.detail === 0) && this.id) {
      if (this.isNestedMenuOpen) {
        this.menuService.closeItem(this.id);
      } else {
        this.menuService.openItem(this.id);
      }
    }
  }
}
