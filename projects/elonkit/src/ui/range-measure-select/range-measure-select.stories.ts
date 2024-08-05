import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { OverlayModule } from '@angular/cdk/overlay';

import { RangeMeasureSelectComponent } from './range-measure-select.component';

import { argsToTemplate, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { CoreModule } from '~storybook/core.module';

const meta: Meta<RangeMeasureSelectComponent> = {
  title: 'UI/Range measure select',
  component: RangeMeasureSelectComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      declarations: [RangeMeasureSelectComponent],
      imports: [
        HttpClientModule,
        CoreModule,
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        OverlayModule,
      ],
      providers: [MatIconRegistry, { provide: MatFormFieldControl, useExisting: RangeMeasureSelectComponent }],
    }),
  ],
  args: {
    placeholder: '',
    required: false,
    disabled: false,
    measuringUnit: '',
    startOptionVariants: ['100', '200', '300'],
    endOptionVariants: ['100', '200', '300'],
    minValue: 1,
    maxValue: 9999,
  },
  render: (args: RangeMeasureSelectComponent) => ({
    props: {
      ...args,
    },
    template: `<mat-form-field appearance="outline">
      <mat-label class="es-body-100">Ширина, мм</mat-label>
        <es-range-measure-select ${argsToTemplate(args)}
        ></es-range-measure-select>
      </mat-form-field>`,
  }),
};

export default meta;
type Story = StoryObj<RangeMeasureSelectComponent>;

export const Demo: Story = {};
