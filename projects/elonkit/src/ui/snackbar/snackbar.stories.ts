import type { Meta, StoryObj } from '@storybook/angular';

import { ESSnackbarComponent } from './';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DemoWrapperModule } from './demo-wrapper/demo-wrapper.module';
import { DemoWrapperComponent } from './demo-wrapper';

const meta: Meta<DemoWrapperComponent> = {
  component: DemoWrapperModule,
  title: 'ui/Snackbar',
  tags: ['autodocs'],
  args: {
    text: 'Snack!',
    icon: 'es-autocomplete-field:magnify',
    dismissAfter: 0,
    horizontalPosition: undefined,
    verticalPosition: undefined,
    size: 'm',
    variant: undefined,
    matIcon: '',
    hasActionCallback: true,
    actionText: 'Action',
  },
  argTypes: {
    icon: {
      control: { type: 'select' },
      options: ['', 'es-autocomplete-field:magnify', 'es-autocomplete-field:clear'],
      description: 'Icon from our lib.',
    },
    dismissAfter: {
      description: 'The length of time in milliseconds to wait before automatically dismissing the snack bar.',
    },
    horizontalPosition: {
      control: { type: 'select' },
      options: ['center', 'end', 'left', 'right', 'start'],
      description: 'The horizontal position to place the snack bar.',
    },
    verticalPosition: {
      control: { type: 'select' },
      options: ['bottom', 'top'],
      description: 'The vertical position to place the snack bar.',
    },
    size: {
      control: { type: 'select' },
      options: ['s', 'm', 'l'],
      description: 'The size of snack bar.',
    },
    variant: {
      control: { type: 'select' },
      options: ['', 'success', 'error'],
      description: 'Color variant of snack bar icon.',
    },
    matIcon: {
      control: { type: 'select' },
      options: ['', 'check_circle', 'delete', 'mail_outline', 'thumb_up', 'thumb_down', 'usb'],
      description: 'Any material icon.',
    },
    hasActionCallback: {
      control: { type: 'boolean' },
      options: [true, false],
      description: 'Action callback you can put to snackbar data in prop `callback`.',
    },
  },
};

export default meta;

type Story = StoryObj<ESSnackbarComponent>;

export const Primary: Story = {
  name: 'Demo',
  render: (args, context) => ({
    template: `
    <demo-wrapper
      [text]="text"
      [icon]="icon"
      [dismissAfter]="dismissAfter"
      [horizontalPosition]="horizontalPosition"
      [verticalPosition]="verticalPosition"
      [size]="size"
      [variant]="variant"
      [matIcon]="matIcon"
      [hasActionCallback]="hasActionCallback"
      [actionText]="actionText"
    ></demo-wrapper>
    `,
    props: {
      ...args,
    },
    moduleMetadata: {
      imports: [DemoWrapperModule, MatSnackBarModule, BrowserAnimationsModule],
    },
  }),
};
