import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'es-made-by',
  templateUrl: './made-by.component.html',
  styleUrls: ['./made-by.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MadeByComponent {
  @Input() public text: string;
  @Input() public icon: string;
  @Input() public svgIcon: string;
  @Input() public clickable: boolean;
}
