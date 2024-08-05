import { Component, Input } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ESSnackbarComponent } from '../index';
import { USnackbarSize, USnackbarVariant } from '../snackbar.types';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-wrapper',
  template: `
    <div class="buttons" style="display: flex; gap: 5px; margin-top: 7%;">
      <div>
        <button mat-stroked-button color="accent" (click)="open()">Open snackbar</button>
      </div>
      <div>
        <button mat-stroked-button color="warn" (click)="dismiss()">Dismiss</button>
      </div>
    </div>
  `,
})
export class DemoWrapperComponent {
  @Input() text?: string;
  @Input() icon?: string;
  @Input() dismissAfter?: number;
  @Input() horizontalPosition?: MatSnackBarHorizontalPosition;
  @Input() verticalPosition?: MatSnackBarVerticalPosition;
  @Input() size?: USnackbarSize;
  @Input() variant?: USnackbarVariant;
  @Input() matIcon?: string;
  @Input() hasActionCallback?: boolean;
  @Input() actionText?: string;
  constructor(private snackBar: MatSnackBar) {}

  public open(): void {
    this.snackBar.openFromComponent(ESSnackbarComponent, {
      data: {
        text: this.text,
        icon: this.icon,
        variant: this.variant,
        size: this.size,
        dismissAfter: this.dismissAfter,
        matIcon: this.matIcon,
        callback: this.hasActionCallback
          ? () => {
              console.log('Callback executed!');
            }
          : null,
        actionText: this.actionText,
      },
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  public dismiss(): void {
    this.snackBar.dismiss();
  }
}
