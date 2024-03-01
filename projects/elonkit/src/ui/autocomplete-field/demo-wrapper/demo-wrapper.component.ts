import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, debounceTime, map, of } from 'rxjs';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-wrapper',
  template: `
    <mat-form-field appearance="outline" style="width: 425px;" [formGroup]="testGroup">
      <mat-label>Наименование</mat-label>

      <es-autocomplete-field
        formControlName="testForm"
        [service]="getOptions"
        [displayWith]="displayWith"
        [required]="required"
        [disabled]="disabled"
        [multiple]="multiple"
        [placeholder]="placeholder"
        selectByKey="id">
        <ng-container *ngIf="header" header>
          <es-autocomplete-header>{{ header }}</es-autocomplete-header>
        </ng-container>

        <ng-container *ngIf="footer" footer>
          <es-autocomplete-footer>{{ footer }}</es-autocomplete-footer>
        </ng-container>
      </es-autocomplete-field>
    </mat-form-field>

    <div>Fom data: {{ testGroup.get('testForm')?.value | json }}</div>
  `,
})
export class DemoWrapperComponent {
  @Input() public required = false;
  @Input() public disabled = false;
  @Input() public multiple = false;
  @Input() public placeholder = '';
  @Input() public header = '';
  @Input() public footer = '';

  private OPTIONS = [
    { id: 1, name: 'Estonia' },
    { id: 2, name: 'Iceland' },
    { id: 3, name: 'Norway' },
    { id: 4, name: 'Lithuania' },
    { id: 5, name: 'Sweden' },
    { id: 6, name: 'Austria' },
    { id: 7, name: 'Switzerland' },
    { id: 8, name: 'Albania' },
    { id: 9, name: 'Portugal' },
    { id: 10, name: 'Russia' },
    { id: 11, name: 'India' },
    { id: 12, name: 'Oman' },
  ];

  protected getOptions = (search: string): Observable<any> => {
    return of(this.OPTIONS).pipe(
      debounceTime(1000),
      map((options) => options.filter((option) => option.name.toLowerCase().includes(search)))
    );
  };

  protected displayWith = (entity: { id: number; name: string }) => entity.name;

  public testGroup: FormGroup;

  constructor() {
    this.testGroup = new FormGroup({
      testForm: new FormControl([]),
    });

    this.testGroup.valueChanges.subscribe((val) => console.log(val));
  }
}
