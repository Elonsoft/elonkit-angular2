import type { Meta, StoryObj } from '@storybook/angular';

import { ESPaginatorComponent } from './';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '~storybook/core.module';
import { HttpClientModule } from '@angular/common/http';
import { DemoWrapperComponent, DemoWrapperModule } from './demo-wrapper';

const meta: Meta<DemoWrapperComponent> = {
  component: DemoWrapperModule,
  title: 'ui/Paginator',
  tags: ['autodocs'],
  args: {
    pageInputBefore: false,
    reverse: false,
    hidePageSize: false,
    count: 1000,
    siblingCount: 1,
    boundaryCount: 1,
  },
  argTypes: {
    count: {
      control: { type: 'select' },
      options: [100, 500, 1000, 5000],
    },
    pageInputBefore: {
      control: { type: 'boolean' },
    },
    reverse: {
      control: { type: 'boolean' },
    },
    hidePageSize: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;

type Story = StoryObj<ESPaginatorComponent>;

export const Primary: Story = {
  name: 'Demo',
  render: (args, context) => ({
    template: `
    <demo-wrapper
    [count]="count"
    [siblingCount]="siblingCount"
    [boundaryCount]="boundaryCount"
    [pageInputBefore]="pageInputBefore"
    [reverse]="reverse"
    [hidePageSize]="hidePageSize"
    ></demo-wrapper>
    `,
    props: {
      ...args,
    },
    moduleMetadata: {
      imports: [DemoWrapperModule, HttpClientModule, CoreModule, BrowserAnimationsModule],
    },
  }),
};
