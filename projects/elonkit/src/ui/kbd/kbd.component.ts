import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'es-kbd',
  templateUrl: './kbd.component.html',
  styleUrls: ['./kbd.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class KbdComponent {
  @Input() public variant: 'raised' | 'contained' | 'outlined' = 'outlined';
}
