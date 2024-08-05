import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DemoWrapperComponent,DemoWrapperModule } from './demo-wrapper';
import { ESSpinnerComponent } from './spinner.component';

import type { Meta, StoryObj } from '@storybook/angular';
import { CoreModule } from '~storybook/core.module';

const meta: Meta<DemoWrapperComponent> = {
  component: DemoWrapperModule,
  title: 'ui/Spinner',
  tags: ['autodocs'],
  args: {
    variant: 'ring',
    size: 40,
    color: '',
    duration: 1000,
    ease: 'linear',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['ring', 'fadingRing', 'fadingDoubleRing', 'dashRing', 'fadingDots', 'fadingBars'],
      description: 'Variant of spinner. Ring as default.',
    },
    size: {
      control: { type: 'number', min: 5, max: 300, step: 5 },
      description: 'Width and height in px',
    },
    color: {
      control: { type: 'select' },
      options: ['', 'primary', 'accent', 'warn', 'info', 'positive', 'attention', 'mono', '#f0f', '#afcc6e'],
      description: 'Color as string. If you prefer not to use this input, the color will be inherited.',
    },
    duration: {
      control: { type: 'number', min: 500, max: 5000, step: 100 },
      description: 'Animation duration in ms',
    },
    ease: {
      control: { type: 'select' },
      options: ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'],
      description: 'Transition-ease',
    },
  },
};

export default meta;

type Story = StoryObj<ESSpinnerComponent>;

export const Primary: Story = {
  name: 'Demo',
  render: (args, context) => ({
    template: `
    <demo-wrapper
    [variant]="variant"
    [size]="size"
    [color]="color"
    [duration]="duration"
    [ease]="ease">
    </demo-wrapper>
    `,
    props: {
      ...args,
    },
    moduleMetadata: {
      imports: [DemoWrapperModule, HttpClientModule, CoreModule, BrowserAnimationsModule],
    },
  }),
};
