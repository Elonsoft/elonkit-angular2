import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { resizeObserver } from 'projects/elonkit/src/utils/resize-observer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'es-sidebar-scrollable',
  templateUrl: './sidebar-scrollable.component.html',
  styleUrls: ['./sidebar-scrollable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ESSidebarScrollableComponent implements AfterViewInit, OnDestroy {
  @ViewChild('scrollableContainer', { static: true }) scrollableContainer!: ElementRef<HTMLDivElement>;
  @HostBinding('class.es-sidebar-scrollable') class = true;

  public isScrollable = false;
  public isBeforeScroll = false;
  public isAfterScroll = true;

  private resizeSubscription!: Subscription;

  constructor(private cd: ChangeDetectorRef) {}

  public ngAfterViewInit() {
    this.resizeSubscription = resizeObserver(this.scrollableContainer.nativeElement).subscribe(() => {
      this.updateScrollableState();
    });

    this.updateScrollableState();
  }

  public ngOnDestroy() {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }

  public updateScrollableState() {
    const container = this.scrollableContainer.nativeElement;
    this.isScrollable = container.scrollHeight > container.clientHeight;
    this.onScroll(); // Initialize the scroll state
    this.cd.detectChanges();
  }

  public onScroll() {
    const container = this.scrollableContainer.nativeElement;
    this.isBeforeScroll = container.scrollTop > 0;
    this.isAfterScroll = !(container.scrollTop >= container.scrollHeight - container.clientHeight);
    this.cd.detectChanges();
  }

  public getScrollableStyles() {
    return this.isScrollable
      ? {
          mask: `${this.isBeforeScroll ? 'linear-gradient(to bottom, transparent 0, black 32px) top' : 'none'}, ${
            this.isAfterScroll ? 'linear-gradient(to bottom, black calc(100% - 32px), transparent 100%) bottom' : 'none'
          }`,
          'mask-size': `${this.isBeforeScroll ? '100%' : 'auto'} ${this.isAfterScroll ? '100%' : 'auto'}`,
          'mask-repeat': 'no-repeat',
        }
      : {};
  }
}
