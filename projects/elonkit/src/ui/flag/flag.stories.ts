import { HttpClientModule } from '@angular/common/http';

import { DemoWrapperComponent, DemoWrapperModule } from './demo-wrapper';

import type { Meta, StoryObj } from '@storybook/angular';
import { CoreModule } from '~storybook/core.module';

const meta: Meta<DemoWrapperComponent> = {
  component: DemoWrapperModule,
  tags: ['autodocs'],
  title: 'ui/Flags',
};

export default meta;

type Story = StoryObj<DemoWrapperComponent>;

export const Primary: Story = {
  name: 'Demo',
  render: (args, context) => ({
    template: `
    <demo-wrapper
    ></demo-wrapper>
    `,
    props: {
      ...args,
    },
    moduleMetadata: {
      imports: [DemoWrapperModule, HttpClientModule, CoreModule],
    },
  }),
};
