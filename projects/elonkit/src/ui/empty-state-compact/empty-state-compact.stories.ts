import { Meta, StoryObj } from '@storybook/angular';
import { ESEmptyStateCompactComponent } from './empty-state-compact.component';

const meta: Meta<ESEmptyStateCompactComponent> = {
  title: 'UI/EmptyStateCompact',
  component: ESEmptyStateCompactComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  render: (args: ESEmptyStateCompactComponent) => ({
    props: {
      ...args,
    },
    template: `<es-empty-state-compact>Сущностей нет</es-empty-state-compact>`,
  }),
};

export default meta;
type Story = StoryObj<ESEmptyStateCompactComponent>;

export const Demo: Story = {};
