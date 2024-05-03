import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'es-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
})
export class ESErrorPageComponent implements OnInit {
  @HostBinding('style.background-image') url = '';
  @Input() imageUrl = '';

  public ngOnInit(): void {
    this.url = `url('${this.imageUrl}')`;
  }
}
