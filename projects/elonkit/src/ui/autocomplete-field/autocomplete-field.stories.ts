import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DemoWrapperComponent,DemoWrapperModule } from './demo-wrapper';
import { ESAutocompleteFieldComponent } from './';

import type { Meta, StoryObj } from '@storybook/angular';
import { CoreModule } from '~storybook/core.module';

const meta: Meta<DemoWrapperComponent> = {
  component: DemoWrapperModule,
  title: 'ui/Autocomplete field',
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
