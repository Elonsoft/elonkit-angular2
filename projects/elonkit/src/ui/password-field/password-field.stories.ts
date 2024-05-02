import type { Meta, StoryObj } from '@storybook/angular';

import { ESPasswordFieldComponent } from './index';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '~storybook/core.module';
import { HttpClientModule } from '@angular/common/http';
import { DemoWrapperComponent, DemoWrapperModule } from './demo-wrapper';

const meta: Meta<DemoWrapperComponent> = {
  component: DemoWrapperComponent,
  tags: ['autodocs'],
  args: {
    visible: false,
    required: true,
    disabled: false,
    placeholder: 'Password',
  },
  argTypes: {
    visible: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;

type Story = StoryObj<ESPasswordFieldComponent>;

export const Primary: Story = {
  name: 'Demo',
  render: (args, context) => ({
    template: `
    <demo-wrapper
    [visible]="visible"
    [disabled]="disabled"
    [required]="required"
    [placeholder]="placeholder"
    >
    </demo-wrapper>
    `,
    props: {
      ...args,
    },
    moduleMetadata: {
      imports: [DemoWrapperModule, HttpClientModule, CoreModule, BrowserAnimationsModule],
    },
  }),
};
