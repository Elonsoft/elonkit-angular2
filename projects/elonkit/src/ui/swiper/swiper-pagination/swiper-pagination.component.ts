import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'es-swiper-pagination',
  templateUrl: './swiper-pagination.component.html',
  styleUrls: ['./swiper-pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ESSwiperPaginationComponent implements OnChanges {
  @Input() swiperPaginationPosition: 'start' | 'end' | 'none' = 'end';
  @Input() swiperPaginationVariant: 'small' | 'big' | 'long' = 'small';
  @Input() swiperPaginationSiblingCount = 0;
  @Input() swiperPaginationTransitionDuration = 150;

  @Input() direction: 'horizontal' | 'vertical' = 'horizontal';
  @Input() from = 0;
  @Input() to = 0;
  @Input() active = 0;

  @Output() trigger = new EventEmitter();

  public siblingFrom = 0;
  public siblingTo = Infinity;

  public ngOnChanges(): void {
    this.countSiblings();
  }

  public getBullets(): number[] {
    const result: number[] = [];
    for (let i = this.from; i <= this.to; i++) {
      result.push(i);
    }
    return result;
  }

  public _onBulletChange(index: number) {
    this.trigger.emit(index);
  }

  private countSiblings(): void {
    this.siblingFrom = this.swiperPaginationSiblingCount
      ? Math.max(
          this.from,
          this.active - this.swiperPaginationSiblingCount - Math.max(0, this.active + this.swiperPaginationSiblingCount - this.to)
        )
      : this.from;

    this.siblingTo = this.swiperPaginationSiblingCount
      ? Math.min(
          this.to,
          this.active +
            this.swiperPaginationSiblingCount +
            Math.max(0, this.from - (this.active - this.swiperPaginationSiblingCount))
        )
      : this.to;
  }
}
