import { Component, Input } from '@angular/core';

@Component({
  selector: 'es-dialog-actions',
  templateUrl: './dialog-actions.component.html',
  styleUrls: ['./dialog-actions.component.scss'],
})
export class DialogActionsComponent {
  @Input()
  align: 'start' | 'center' | 'end' = 'start';

  @Input()
  sticky = true;
}
