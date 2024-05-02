import type { Meta, StoryObj } from '@storybook/angular';

import { ESPasswordFieldComponent } from './index';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '~storybook/core.module';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';

const meta: Meta<ESPasswordFieldComponent> = {
  component: ESPasswordFieldComponent,
  tags: ['autodocs'],
  args: {
    visible: false
  },
  argTypes: {
    visible: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;

type Story = StoryObj<ESPasswordFieldComponent>;

// const testGroup = new FormGroup({
//   password: new FormControl(''),
// });

export const Primary: Story = {
  name: 'Demo',
  render: (args, context) => ({
    template: `
    <form [formGroup]="testGroup">
      <es-password-field formControlName="password" [visible]="visible"></es-password-field>
    </form>
    `,
    props: {
      ...args,
    },
    moduleMetadata: {
      imports: [ESPasswordFieldComponent, HttpClientModule, CoreModule, BrowserAnimationsModule],
    },
  }),
};
