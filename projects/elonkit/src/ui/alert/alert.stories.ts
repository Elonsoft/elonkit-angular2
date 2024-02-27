import type { Meta, StoryObj } from '@storybook/angular';

import { action } from '@storybook/addon-actions';

import { ESAlertModule, ESAlertComponent } from '.';

const meta: Meta<ESAlertModule> = {
  component: ESAlertComponent,
  tags: ['autodocs'],
  args: {
    hasIcon: true,
    icon: '',
    actions: false,
    closable: true,
    severity: 'info',
    color: '',
    title: '',
    text: '',
    titleTypography: '',
    typography: '',
    svgIcon: '',
  },
  argTypes: {
    hasIcon: {
      options: [true, false],
      control: { type: 'boolean' },
    },
    closable: {
      options: [true, false],
      control: { type: 'boolean' },
    },
    actions: {
      options: [true, false],
      control: { type: 'boolean' },
    },
    severity: {
      options: ['success', 'warning', 'error', 'info', 'default'],
      control: { type: 'select' },
    },
    color: {
      options: [null, 'success', 'warning', 'error', 'info', 'default'],
      control: { type: 'select' },
    },
  },
};

export default meta;

type Story = StoryObj<ESAlertComponent>;

const getText = (args: any, context: any) => {
  return args.text || (context.globals.locale === 'en' ? 'Message' : 'Сообщение');
};

const getTitle = (args: any, context: any) => {
  return args.title || (context.globals.locale === 'en' ? 'Title' : 'Заголовок');
};

export const Primary: Story = {
  name: 'Demo',
  render: (args, context) => ({
    template: `
    <es-alert
      [severity]="severity"
      [color]="color"
      [closable]="closable"
      (closed)="onClose()"
      [icon]="icon"
      [hasIcon]="hasIcon"
      [titleTypography]="titleTypography"
      [typography]="typography"
      [svgIcon]="svgIcon"
    >
      <ng-container role="title">{{title}}</ng-container>
      {{text}}
      <ng-container *ngIf="actions">
        <es-alert-actions>
          <button mat-flat-button (click)="onAction()">Action</button>
          <button mat-button (click)="onCancel()">Cancel</button>
        </es-alert-actions>
      </ng-container>
    </es-alert>
  `,
    props: {
      ...args,
      title: getTitle(args, context),
      text: getText(args, context),
      onClose: action('onClose'),
      onAction: action('onAction'),
      onCancel: action('onCancel'),
    },
    moduleMetadata: {
      imports: [ESAlertModule],
    },
  }),
};
