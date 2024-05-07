import { argsToTemplate, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { MadeByComponent } from './made-by.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

const meta: Meta<MadeByComponent> = {
  title: 'UI/MadeBy',
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