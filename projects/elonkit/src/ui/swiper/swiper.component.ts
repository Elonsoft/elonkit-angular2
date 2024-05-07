import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'es-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ESSwiperComponent implements OnChanges, AfterViewInit {
  @Input() direction: 'horizontal' | 'vertical' = 'horizontal';
  @Input() alignment: 'center' | 'start' = 'center';
  @Input() gap = 16;
  @Input() snap = false;
  @Input() snapStop = false;
  @Input() draggable = false;
  @Input() loop = false;
  @Input() autoPlay = 0;
  @Input() autoPlayCount = 1;

  @Input() swiperPaginationPosition: 'start' | 'end' | 'none' = 'end';
  @Input() swiperPaginationVariant: 'small' | 'big' | 'long' = 'small';
  @Input() swiperPaginationSiblingCount = 0;
  @Input() swiperPaginationTransitionDuration = 150;

  public active = -1;
  public from = 0;
  public to = 0;

  public isPrevVisible = false;
  public isNextVisible = false;

  public isMouseDown = false;
  private isMouseOver = false;
  private isTouchDown = false;

  /**
   * @ignore
   * @internal
   */
  @HostListener('window:resize')
  _onResize() {
    this.getPaginationRange();
  }

  /**
   * @ignore
   * @internal
   */
  @ViewChild('container') private container: ElementRef;

  /**
   * @ignore
   * @internal
   */
  private getPropertyMapping(direction: 'horizontal' | 'vertical') {
    if (direction === 'horizontal') {
      return {
        scrollSize: 'scrollWidth',
        clientSize: 'clientWidth',
        scrollPosition: 'scrollLeft',
        offset: 'offsetLeft',
        start: 'left',
        end: 'right',
        movement: 'movementX',
      } as const;
    } else {
      return {
        scrollSize: 'scrollHeight',
        clientSize: 'clientHeight',
        scrollPosition: 'scrollTop',
        offset: 'offsetTop',
        start: 'top',
        end: 'bottom',
        movement: 'movementY',
      } as const;
    }
  }

  /**
   * @ignore
   * @internal
   */
  private mapping = this.getPropertyMapping(this.direction);

  /**
   * @ignore
   * @internal
   */
  public ngOnChanges(): void {
    this.mapping = this.getPropertyMapping(this.direction);

    if (this.container) {
      this.getPaginationRange();
    }

    this.play();
  }

  /**
   * @ignore
   * @internal
   */
  public ngAfterViewInit(): void {
    this.getPaginationRange();
    this.play();

    // Used to init scroll positions
    this.container.nativeElement[this.mapping.scrollPosition] += 1;
    this.container.nativeElement[this.mapping.scrollPosition] -= 1;
  }

  /**
   * @returns Index of the slide closest to the center of the container.
   */
  public getActiveSlide(): number | null {
    let active = null;
    const rect = this.container.nativeElement.getBoundingClientRect();
    const center = (rect[this.mapping.start] + rect[this.mapping.end]) / 2;
    const children = this.container.nativeElement.children;

    for (let i = 0; i < children.length; i++) {
      const childRect = children[i].getBoundingClientRect();
      const start = childRect[this.mapping.start];
      const end = childRect[this.mapping.end];

      if (start - this.gap / 2 < center && end + this.gap / 2 > center) {
        active = i;
        break;
      }
    }
    return active;
  }

  /**
   * Scroll to the slide by its index.
   * @param index Index of the slide.
   */
  public setActiveSlide(index: number, options?: { smooth?: boolean }): void {
    const children = this.container.nativeElement.children[
      Math.max(0, Math.min(index, this.container.nativeElement.children.length - 1))
    ] as HTMLElement;

    if (children) {
      const start =
        children[this.mapping.offset] -
        this.container.nativeElement[this.mapping.clientSize] / 2 +
        children[this.mapping.clientSize] / 2;
      this.container.nativeElement.scrollTo({
        [this.mapping.start]: start,
        behavior: options?.smooth ?? true ? 'smooth' : 'auto',
      });
    }
  }

  /**
   * @param direction -1 for the previous slide(s) or 1 for the next slide(s).
   * @param count Count of the slides.
   * @returns Distance to scroll the container.
   */
  public getStep(direction: 1 | -1, count = 1): number {
    let step = 0;
    const containerRect = this.container.nativeElement.getBoundingClientRect();
    const start = containerRect[this.mapping.start];
    const end = containerRect[this.mapping.end];
    const children = this.container.nativeElement.children;

    if (this.alignment === 'center') {
      const active = this.getActiveSlide();

      if (active !== null) {
        const center = (start + end) / 2;

        for (let i = active; count >= 1 && (direction === -1 ? i >= 0 : i < children.length); i += direction) {
          const child = children[i];
          const childNext = children[i + direction];

          if (i === active) {
            const rect = child.getBoundingClientRect();
            step += direction === -1 ? center - rect[this.mapping.start] : rect[this.mapping.end] - center;
          } else {
            step += child[this.mapping.clientSize] / 2;
          }

          if (childNext) {
            step += childNext[this.mapping.clientSize] / 2 + this.gap;
          }

          count--;
        }
      }
    } else {
      const BUFFER = 8;

      if (direction === 1) {
        for (let i = 0; i < children.length; i++) {
          const rect = children[i].getBoundingClientRect();

          if (rect[this.mapping.end] - start > BUFFER) {
            step = rect[this.mapping.end] - start + this.gap;

            if (count === 1) {
              break;
            } else {
              count--;
            }
          }
        }
      } else {
        for (let i = children.length - 1; i >= 0; i--) {
          const rect = children[i].getBoundingClientRect();

          if (rect[this.mapping.start] - start < -BUFFER) {
            step = -(rect[this.mapping.start] - start);

            if (count === 1) {
              break;
            } else {
              count--;
            }
          }
        }
      }
    }

    return step;
  }

  /**
   * @ignore
   * @internal
   */
  private getPaginationRange(): void {
    const children = this.container.nativeElement.children;

    const start = this.container.nativeElement.getBoundingClientRect()[this.mapping.start];
    const scrollPosition = this.container.nativeElement[this.mapping.scrollPosition];
    const scrollSize = this.container.nativeElement[this.mapping.scrollSize];
    const center = this.container.nativeElement[this.mapping.clientSize] / 2;

    let newFrom = 0;
    let newTo = children.length - 1;

    while (
      children[newFrom] &&
      children[newFrom].getBoundingClientRect()[this.mapping.end] - start + scrollPosition + this.gap / 2 <= center
    ) {
      newFrom++;
    }

    while (
      children[newTo] &&
      scrollSize - (children[newTo].getBoundingClientRect()[this.mapping.start] - start + scrollPosition) + this.gap / 2 <= center
    ) {
      newTo--;
    }

    if (newFrom !== this.from) {
      this.from = newFrom;
    }

    if (newTo !== this.to) {
      this.to = newTo;
    }
  }

  /**
   * Scroll container by the given number of slides.
   * @param step Number of slides.
   */
  public setActiveSlideByStep(step: number, options?: { smooth?: boolean }): void {
    if (this.active === this.to && step > 0 && this.loop) {
      this.container.nativeElement.scrollTo({ [this.mapping.start]: 0, behavior: 'smooth' });
      return;
    }

    if (this.active === this.from && step < 0 && this.loop) {
      this.container.nativeElement.scrollTo({
        [this.mapping.start]: this.container.nativeElement[this.mapping.scrollSize],
        behavior: 'smooth',
      });
      return;
    }

    const s = this.getStep(Math.sign(step) as 1 | -1, Math.abs(step));

    this.container.nativeElement.scrollBy({
      [this.mapping.start]: Math.sign(step) * s,
      behavior: options?.smooth ?? true ? 'smooth' : 'auto',
    });
  }

  /**
   * @ignore
   * @internal
   */
  public _onDragStart(event: DragEvent): boolean {
    event.preventDefault();
    return false;
  }

  /**
   * @ignore
   * @internal
   */
  public _onMouseDown(): void {
    this.isMouseDown = true;
  }

  /**
   * @ignore
   * @internal
   */
  public _onMouseEnter(): void {
    this.isMouseOver = true;
    this.stop();
  }

  /**
   * @ignore
   * @internal
   */
  public _onMouseLeave(): void {
    this.isMouseOver = false;
    this._onMouseUp();
    this.play();
  }

  /**
   * @ignore
   * @internal
   */
  public _onMouseMove(event: MouseEvent): void {
    if (this.draggable && this.isMouseDown && this.container) {
      this.container.nativeElement[this.mapping.scrollPosition] -= event[this.mapping.movement];
    }
  }

  /**
   * @ignore
   * @internal
   */
  public _onMouseUp(): void {
    if (this.isMouseDown) {
      this.isMouseDown = false;
    }

    if (this.snap) {
      const index = this.getActiveSlide();

      if (index !== null) {
        this.setActiveSlide(index);
      }
    }
  }

  /**
   * @ignore
   * @internal
   */
  public _onScroll(): void {
    const newActive = this.getActiveSlide();

    if (this.container.nativeElement[this.mapping.scrollPosition] <= 0 && !this.loop) {
      this.isPrevVisible = false;
    } else {
      this.isPrevVisible = true;
    }

    if (
      this.container.nativeElement[this.mapping.clientSize] + this.container.nativeElement[this.mapping.scrollPosition] >=
        this.container.nativeElement[this.mapping.scrollSize] - 1 &&
      !this.loop
    ) {
      this.isNextVisible = false;
    } else {
      this.isNextVisible = true;
    }

    if (newActive !== null && newActive !== this.active) {
      this.active = newActive;
    }
  }

  /**
   * @ignore
   * @internal
   */
  public _onTouchStart(): void {
    this.isTouchDown = true;
    this.stop();
  }

  /**
   * @ignore
   * @internal
   */
  public _onTouchEnd(): void {
    this.isTouchDown = false;
    this.play();
  }

  /**
   * @ignore
   * @internal
   */
  public _onClick(step: number): void {
    this.setActiveSlideByStep(step);
    this.stop();
  }

  /**
   * @ignore
   * @internal
   */
  private autoplayInterval: number;

  /**
   * @ignore
   * @internal
   */
  private play(): void {
    if (this.autoPlay && this.autoPlay > 0 && !this.isMouseDown && !this.isMouseOver && !this.isTouchDown) {
      if (this.autoplayInterval) {
        clearInterval(this.autoplayInterval);
      }

      this.autoplayInterval = window.setInterval(() => {
        if (
          this.container.nativeElement[this.mapping.clientSize] + this.container.nativeElement[this.mapping.scrollPosition] >=
          this.container.nativeElement[this.mapping.scrollSize] - 1
        ) {
          this.container.nativeElement.scrollTo({ [this.mapping.start]: 0, behavior: 'smooth' });
        } else {
          const step = this.getStep(1, this.autoPlayCount);
          this.container.nativeElement.scrollBy({ [this.mapping.start]: step, behavior: 'smooth' });
        }
      }, this.autoPlay);
    }
  }

  /**
   * @ignore
   * @internal
   */
  private stop(): void {
    window.clearInterval(this.autoplayInterval);
  }
}
