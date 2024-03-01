import type { Meta, StoryObj } from '@storybook/angular';

import { ESAutocompleteFieldComponent, ESAutocompleteFieldModule } from './';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Observable, debounceTime, map, of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '~storybook/core.module';
import { HttpClientModule } from '@angular/common/http';

import { DemoWrapperModule, DemoWrapperComponent } from './demo-wrapper';

const meta: Meta<DemoWrapperComponent> = {
  component: DemoWrapperModule,
  tags: ['autodocs'],
  args: {
    disabled: false,
    required: false,
    multiple: true,
    placeholder: 'Search',
    header: '',
    footer: '',
  },
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
    },
    required: {
      control: { type: 'boolean' },
    },
    multiple: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;

type Story = StoryObj<ESAutocompleteFieldComponent>;

export const Primary: Story = {
  name: 'Demo',
  render: (args, context) => ({
    template: `
    <demo-wrapper
    [disabled]="disabled"
    [required]="required"
    [multiple]="multiple"
    [placeholder]="placeholder"
    [header]="header"
    [footer]="footer"
    ></demo-wrapper>
    `,
    props: {
      ...args,
    },
    moduleMetadata: {
      imports: [DemoWrapperModule, HttpClientModule, CoreModule, BrowserAnimationsModule],
    },
  }),
};
