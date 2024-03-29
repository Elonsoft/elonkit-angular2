import { AfterViewChecked, Directive, ElementRef, Input, Renderer2 } from '@angular/core';

const EXPAND_BUTTON_WIDTH = 50;

@Directive({
  selector: '[esSFSChipVisibility]',
  exportAs: 'esSFSChipVisibility',
  standalone: true,
})
export class ESSFSChipVisibilityDirective implements AfterViewChecked {
  @Input() public isContainerExpand = true;
  @Input() public containerRef: HTMLElement | undefined;

  private isVisible = true;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}

  public ngAfterViewChecked() {
    const offsetLeft = this.elementRef.nativeElement.offsetLeft;
    const offsetWidth = this.elementRef.nativeElement.offsetWidth;
    const filledSpaceWidth = offsetLeft + offsetWidth + EXPAND_BUTTON_WIDTH;

    const w = this.containerRef?.clientWidth ?? 0;

    if (filledSpaceWidth >= w && this.isVisible) {
      this.isVisible = false;

      this.renderer.setStyle(this.elementRef.nativeElement, 'visibility', 'hidden');
    } else if (filledSpaceWidth < w && !this.isVisible) {
      this.isVisible = true;

      this.renderer.setStyle(this.elementRef.nativeElement, 'visibility', 'visible');
    }
  }
}
