import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MadeByComponent } from './made-by.component';

import { argsToTemplate, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

const meta: Meta<MadeByComponent> = {
  title: 'ui/Made by',
  component: MadeByComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  args: {
    text: 'Сделано',
    icon: 'house',
  },
  decorators: [
    moduleMetadata({
      declarations: [MadeByComponent],
      imports: [CommonModule, MatButtonModule, MatIconModule],
    }),
  ],
  render: (args: MadeByComponent) => ({
    props: {
      ...args,
    },
    template: `<es-made-by ${argsToTemplate(args)}></es-made-by>`,
  }),
};

export default meta;
type Story = StoryObj<MadeByComponent>;

export const Demo: Story = {};
