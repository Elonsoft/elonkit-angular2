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
    width: 200,
    maxWidth: 400,
    minWidth: 180,
    isOpen: false,
    behavior: 'click',
    exclusive: false,
    disabled: false,
  },
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary'],
      description: 'Color of sidebar content.',
    },
    width: {
      description: 'Width the sidebar will have when opened.',
    },
    minWidth: {
      description: 'Minimum width to which the sidebar can be reduced.',
    },
    maxWidth: {
      description: 'Maximum width to which the sidebar can be extended.',
    },
    isOpen: {
      description: 'Sets the sidebar and its components to the open state.',
    },
    behavior: {
      control: { type: 'radio' },
      options: ['click', 'hover'],
      description: "Behavior of opening item's dropdowns.",
    },
    exclusive: {
      description:
        'If the parameter is true, the open menu of a nested component will be closed when another component is opened.',
    },
    disabled: {
      description:
        'Disables the sidebar-item. If the sidebar-item has nested elements, they should also be given the disabled state.',
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
    [color]="color" [width]="width" [maxWidth]="maxWidth" [minWidth]="minWidth" [isOpen]="isOpen" [behavior]="behavior" [exclusive]="exclusive" [disabled]="disabled"
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
