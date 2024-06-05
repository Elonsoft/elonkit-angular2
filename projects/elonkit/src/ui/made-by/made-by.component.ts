import {Component, Input} from '@angular/core';

@Component({
  selector: 'es-made-by',
  templateUrl: './made-by.component.html',
  styleUrls: ['./made-by.component.scss']
})
export class MadeByComponent {
  @Input() public text: string = 'Сделано в';
  @Input() public iconName: string = 'house';
}
