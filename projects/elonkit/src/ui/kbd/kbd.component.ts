import {Component, Input} from '@angular/core';

@Component({
  selector: 'es-kbd',
  templateUrl: './kbd.component.html',
  styleUrls: ['./kbd.component.scss']
})
export class KbdComponent {
  @Input() public variant: 'raised' | 'contained' | 'outlined' = 'outlined';
}
