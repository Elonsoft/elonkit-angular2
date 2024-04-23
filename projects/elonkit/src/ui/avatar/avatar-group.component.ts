import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ElementRef,
  ViewEncapsulation,
  OnInit,
  ContentChildren,
  QueryList,
  AfterContentInit,
  Renderer2,
  OnDestroy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { ESAvatarComponent } from './avatar.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ESAvatarVariant } from './avatar.types';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'es-avatar-group',
  templateUrl: './avatar-group.component.html',
  styleUrls: ['./avatar-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ESAvatarGroupComponent implements AfterContentInit, OnDestroy, OnChanges {
  @ContentChildren(ESAvatarComponent, { read: ElementRef }) private avatars: QueryList<ElementRef>;

  /**
   * Defines size of the avatar in pixels.
   */
  @Input()
  public get size(): number {
    return this._size;
  }
  public set size(value: number | undefined) {
    this._size = coerceNumberProperty(value, 40);
  }
  /**
   * @ignore
   */
  private _size: number;

  /**
   * Defines space beetween avatars.
   */
  @Input()
  public get spacing(): number {
    return this._spacing;
  }
  public set spacing(value: number | undefined) {
    this._spacing = coerceNumberProperty(value, 0);
  }
  /**
   * @ignore
   */
  private _spacing: number;

  /**
   * Defines space around avatar avatars.
   */
  @Input()
  public get cutoutWidth(): number {
    return this._cutoutWidth;
  }
  public set cutoutWidth(value: number) {
    this._cutoutWidth = coerceNumberProperty(value, 0);
  }
  /**
   * @ignore
   */
  public _cutoutWidth: number;

  /**
   * Reverses avatars stacking.
   */
  @Input()
  public get reverse(): boolean {
    return this._reverse;
  }
  public set reverse(value: boolean | undefined) {
    this._reverse = coerceBooleanProperty(value);
  }
  /**
   * @ignore
   */
  private _reverse = false;

  private destroyed$ = new Subject<void>();

  /**
   * @ignore
   */
  constructor(
    private _elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  /**
   * @ignore
   */
  public ngOnChanges(changes: SimpleChanges): void {
    this._elementRef.nativeElement.style.setProperty('--size', `${this.size + `px`}`);
    this._elementRef.nativeElement.style.setProperty('--spacing', `${this.spacing + `px`}`);
    this._elementRef.nativeElement.style.setProperty('--cutout', `${this.cutoutWidth + `px`}`);
    if (this.avatars) {
      this.setAvatarsIndex(this.avatars);
    }
  }

  /**
   * @ignore
   */
  public ngAfterContentInit() {
    this.setAvatarsIndex(this.avatars);
    this.avatars.changes.pipe(takeUntil(this.destroyed$)).subscribe((avatars) => {
      if (avatars) {
        this.setAvatarsIndex(avatars);
      }
    });
  }

  /**
   * @ignore
   */
  private setAvatarsIndex = (avatars: any[] | QueryList<ElementRef<any>>): void => {
    const avatarsArray = this.reverse ? Array.from(avatars).reverse() : Array.from(avatars);
    avatarsArray.forEach((avatar, index) => {
      this.renderer.setStyle(avatar.nativeElement, 'z-index', index);
    });
  };

  /**
   * @ignore
   */
  public ngOnDestroy() {
    this.destroyed$.next();
  }
}
