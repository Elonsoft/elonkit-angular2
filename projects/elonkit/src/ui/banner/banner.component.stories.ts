import type { Meta, StoryObj } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '~storybook/core.module';
import { HttpClientModule } from '@angular/common/http';
import { ESBannerComponent } from './banner.component';

// import { DemoWrapperModule, DemoWrapperComponent } from './demo-wrapper';

const meta: Meta<ESBannerComponent> = {
  component: ESBannerComponent,
  title: 'ui/Banner',
  tags: ['autodocs'],
  args: {
    // color: '#000',
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<ESBannerComponent>;

export const Primary: Story = {
  name: 'Demo',
  render: (args, context) => ({
    template: `
    <es-banner></es-banner>
    `,
    props: {
      ...args,
    },
    moduleMetadata: {
      // imports: [DemoWrapperModule, HttpClientModule, CoreModule, BrowserAnimationsModule],
    },
  }),
};
