import type { Meta, StoryObj } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ESSFSComponent } from './sfs.component';
import { DemoWrapperComponent, DemoWrapperModule } from './demo-wrapper';

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
  title: 'ui/SFS',
  tags: ['autodocs'],
  args: {
    showFiltersButton: true,
    showSearchInput: false,
    count: 0,
    sortingOptions: options,
    mockValues: false,
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<ESSFSComponent>;

export const Primary: Story = {
  name: 'Demo',
  render: (args, context) => ({
    template: `
    <demo-wrapper
      [showFiltersButton]="showFiltersButton"
      [showSearchInput]="showSearchInput"
      [count]="count"
      [sortingOptions]="sortingOptions"
      [mockValues]="mockValues"
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
