import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DemoWrapperComponent, DemoWrapperModule } from './demo-wrapper';
import { ESSortingComponent } from './sorting.component';

import type { Meta, StoryObj } from '@storybook/angular';

const options = [
  {
    directionLabels: {
      asc: 'По возрастанию',
      desc: 'По убыванию',
    },
    sortBy: 'id',
    label: 'ID',
  },
  {
    directionLabels: {
      asc: 'от А до Я',
      desc: 'от Я до А',
    },
    sortBy: 'name',
    label: 'Наименование',
  },
  {
    directionLabels: {
      asc: 'от А до Я',
      desc: 'от Я до А',
    },
    sortBy: 'author',
    label: 'Автор',
  },
  {
    directionLabels: {
      asc: 'По возрастанию',
      desc: 'По убыванию',
    },
    sortBy: 'created_at',
    label: 'Дата создания',
  },
];

const meta: Meta<DemoWrapperComponent> = {
  component: DemoWrapperModule,
  title: 'ui/Sorting',
  tags: ['autodocs'],
  args: {
    value: { sortBy: '', direction: '' },
    disabled: false,
    placeholder: 'Sort',
    defaultDirection: 'asc',
    sortingOptions: options,
  },
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
    },
    defaultDirection: {
      control: { type: 'select' },
      options: ['asc', 'desc'],
    },
  },
};

export default meta;

type Story = StoryObj<ESSortingComponent>;

export const Primary: Story = {
  name: 'Demo',
  render: (args, context) => ({
    template: `
    <demo-wrapper
      [value]="value"
      [disabled]="disabled"
      [placeholder]="placeholder"
      [defaultDirection]="defaultDirection"
      [sortingOptions]="sortingOptions"
    ></demo-wrapper>
    `,
    props: {
      ...args,
    },
    moduleMetadata: {
      imports: [DemoWrapperModule, BrowserAnimationsModule],
    },
  }),
};
