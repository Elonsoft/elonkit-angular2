import type { Meta, StoryObj } from '@storybook/angular';
import { ESSwitchComponent } from '.';
import { DemoWrapperModule, DemoWrapperComponent } from './demo-wrapper';

const meta: Meta<DemoWrapperComponent> = {
  component: DemoWrapperComponent,
  tags: ['autodocs'],
  title: 'UI/Switch',
  args: {
    color: '',
    size: 'medium',
    disabled: false,
    indeterminate: false,
    readonly: false,
    type: 'checkbox',
    defaultChecked: false,
    autoFocus: false,
  },
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['', 'primary', 'accent', 'warn', 'info', 'positive', 'attention', 'mono', '#f0f', '#afcc6e'],
      description: 'Color as string.',
    },
    size: {
      control: { type: 'radio' },
      options: ['small', 'medium', 'large'],
      description: 'The size of the component.',
    },
    disabled: {
      description: 'If `true`, the component is disabled.',
    },
    indeterminate: {
      description: 'If `true`, the component appears indeterminate.',
    },
    readonly: {
      description: 'It prevents the user from changing the value of the field.',
    },
    type: {
      control: { type: 'radio' },
      options: ['checkbox', 'button'],
      description: "If 'button', hitting enter will toggle the switch.",
    },
    defaultChecked: {
      description: 'The default checked state. Use when the component is not controlled.',
    },
    autoFocus: {
      description: 'If `true`, the `input` element is focused during the first mount.',
    },
  },
};

export default meta;

type Story = StoryObj<ESSwitchComponent>;

export const Primary: Story = {
  name: 'Demo',
  render: (args, context) => ({
    template: `
    <demo-wrapper [color]="color" [size]="size" [disabled]="disabled" [indeterminate]="indeterminate" [readonly]="readonly" [type]="type" [defaultChecked]="defaultChecked" [autoFocus]="autoFocus"
    ></demo-wrapper>
    `,
    props: {
      ...args,
    },
    moduleMetadata: {
      imports: [DemoWrapperModule],
    },
  }),
};
