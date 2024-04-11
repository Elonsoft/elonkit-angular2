import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'es-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
})
export class OverlayComponent {
  @ViewChild('overlay', { static: false })
  public overlay: ElementRef | undefined;

  @Input() public appendTo: HTMLElement = document.body;

  @Input()
  public innerClass = '';

  public get visible(): boolean {
    return this._visible;
  }

  public set visible(val: boolean) {
    this._visible = val;
  }

  private get _nativeElement(): HTMLElement {
    return this.overlay?.nativeElement;
  }

  private _appended = false;
  private _visible = false;

  public open(): void {
    if (this.visible) {
      return;
    }
    this.visible = true;
    this._appendOverlay();
  }

  public close(): void {
    if (!this.visible) {
      return;
    }
    this.visible = false;
    this._removeAppendedOverlay();
  }

  private _appendOverlay = (): void => {
    this._appended = true;
    this.appendTo.appendChild(this._nativeElement);
  };

  private _removeAppendedOverlay = (): void => {
    if (this._appended) {
      this.appendTo.removeChild(this._nativeElement);
      this._appended = false;
    }
  };
}
