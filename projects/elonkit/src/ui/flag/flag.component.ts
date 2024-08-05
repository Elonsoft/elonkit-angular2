import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'es-flag',
  templateUrl: 'flag.component.html',
  styleUrls: ['flag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatIconModule],
})
export class ESFlagComponent {
  @Input() flag: string;
  constructor() {
    this.flag = 'es-flag:Empty';
  }
}
