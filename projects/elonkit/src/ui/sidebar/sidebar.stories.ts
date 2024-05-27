import type { Meta, StoryObj } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '~storybook/core.module';
import { HttpClientModule } from '@angular/common/http';

import { DemoWrapperModule, DemoWrapperComponent } from './demo-wrapper';

const meta: Meta<DemoWrapperComponent> = {
  component: DemoWrapperComponent,
  tags: ['autodocs'],
  title: 'ui/Sidebar',
  args: {
    color: 'default',
    width: 280,
    maxWidth: 400,
    minWidth: 220,
    isOpen: false,
    behavior: 'click',
    exclusive: false,
  },
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary'],
      description: 'Color of sidebar contnent',
    },
    behavior: {
      control: { type: 'radio' },
      options: ['click', 'hover'],
      description: "Behavior of openning item's dropdowns",
    },
  },
};

export default meta;

type Story = StoryObj<DemoWrapperComponent>;

export const Primary: Story = {
  name: 'Demo',
  render: (args, context) => ({
    template: `
    <demo-wrapper
    [color]="color" [width]="width" [maxWidth]="maxWidth" [minWidth]="minWidth" [isOpen]="isOpen" [behavior]="behavior" [exclusive]="exclusive"
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
