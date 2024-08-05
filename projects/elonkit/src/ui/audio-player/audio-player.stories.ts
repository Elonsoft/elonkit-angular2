import type { Meta, StoryObj } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '~storybook/core.module';
import { HttpClientModule } from '@angular/common/http';

import { DemoWrapperModule, DemoWrapperComponent } from './demo-wrapper';

const meta: Meta<DemoWrapperComponent> = {
  component: DemoWrapperModule,
  title: 'ui/Audioplayer',
  tags: ['autodocs'],
  args: {
    volume: 50,
    source: 'https://cdn.pixabay.com/audio/2022/05/23/audio_fe63ebc58c.mp3',
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<DemoWrapperComponent>;

export const Primary: Story = {
  name: 'Demo',
  render: (args, context) => ({
    template: `
    <demo-wrapper
    [volume]="volume"
    [source]="source"
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
