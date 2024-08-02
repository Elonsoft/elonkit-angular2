import { argsToTemplate, type Meta, type StoryObj } from '@storybook/angular';
import { ESBannerComponent } from './banner.component';
import { ESBannerModule } from '.';
import { action } from '@storybook/addon-actions';

const meta: Meta<ESBannerComponent> = {
  component: ESBannerComponent,
  title: 'ui/Banner',
  tags: ['autodocs'],
  args: {
    hasIcon: true,
    icon: '',
    // actions: false,
    closable: true,
    severity: 'info',
    color: '',
    // title: '',
    // text: '',
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

type Story = StoryObj<ESBannerComponent>;

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
    <h2>Attention!</h2>
    <h4>Component isn't finished!</h4>
    <es-banner
      ${argsToTemplate(args)}
      (closed)="onClose()"
    >
      <ng-container role="title">{{title}}</ng-container>
      {{text}}
      <ng-container *ngIf="actions">
        <es-alert-actions>
          <button mat-flat-button (click)="onAction()">Action</button>
          <button mat-button (click)="onCancel()">Cancel</button>
        </es-alert-actions>
      </ng-container>
    </es-banner>
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
      imports: [ESBannerModule],
    },
  }),
};
