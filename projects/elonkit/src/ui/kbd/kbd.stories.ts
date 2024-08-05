import { KbdComponent } from './kbd.component';

import { argsToTemplate, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

const meta: Meta<KbdComponent> = {
  title: 'UI/Kbd',
  component: KbdComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  args: {
    variant: 'outlined',
  },
  render: (args: KbdComponent) => ({
    props: {
      ...args,
    },
    template: `<span class="es-body-200">Lorem ipsum dolor sit amet <es-kbd ${argsToTemplate(args)}>Ctrl</es-kbd> consectetur adipiscing elit</span>`,
  }),
};

export default meta;
type Story = StoryObj<KbdComponent>;

export const Demo: Story = {};
