import { argsToTemplate, Meta, StoryObj } from '@storybook/angular';
import { ESEmptyStateModule, ESEmptyStateComponent } from './index';
import { MatButtonModule } from '@angular/material/button';

const meta: Meta<ESEmptyStateComponent> = {
  title: 'UI/Empty State',
  component: ESEmptyStateComponent,
  tags: ['autodocs'],
  args: {
    icon: 'box',
    heading: 'There are no entities yet',
    subheading: 'There are no entities yet. Do you want to create the first entity?',
    src: '',
    size: 'medium',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium'],
    },
  },
  render: (args: ESEmptyStateComponent) => ({
    props: {
      ...args,
    },
    template: `<es-empty-state
        ${argsToTemplate(args)}>
        <button mat-stroked-button color="primary">NEW ENTITY</button>
      </es-empty-state>`,
    moduleMetadata: {
      imports: [ESEmptyStateModule, MatButtonModule],
    },
  }),
};

export default meta;
type Story = StoryObj<ESEmptyStateComponent>;

export const Demo: Story = {};
