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

  @Input() icon = '';
  @Input() text = '';
  @Input() id?: number;
  @Input() isOpen = false;
  @Input() color: 'default' | 'primary' | 'secondary' = 'default';
  @Input() isNestedMenuOpen?: boolean | null = null;

  @Output() itemClick = new EventEmitter<void>();

  public behaviour: 'click' | 'hover' = 'click';
  public width$ = new BehaviorSubject<number>(0);
  private resizeSubscription!: Subscription;

  constructor(public menuService: ESSidebarMenuService) {}

  public ngAfterViewInit(): void {
    console.log('init');
    this.behaviour = this.menuService.behaviour;

    this.resizeSubscription = resizeObserver(this.itemButtonContainer.nativeElement).subscribe(() => {
      this.width$.next(this.itemButtonContainer.nativeElement.clientWidth + this.itemButtonContainer.nativeElement.offsetLeft);
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    console.log('changes');
    this.behaviour = this.menuService.behaviour;
  }

  public ngOnDestroy(): void {
    this.resizeSubscription.unsubscribe();
  }
}
