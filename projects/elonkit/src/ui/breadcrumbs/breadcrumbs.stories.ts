import type { Meta, StoryObj } from '@storybook/angular';

import { ESBreadcrumbsComponent } from './';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '~storybook/core.module';
import { HttpClientModule } from '@angular/common/http';
import { DemoWrapperComponent, DemoWrapperModule } from './demo-wrapper';

const meta: Meta<DemoWrapperComponent> = {
  component: DemoWrapperComponent,
  title: 'ui/Breadcrumbs',
  tags: ['autodocs'],
  args: {
    breadcrumbs: [
      {
        callback: () => {
          console.log('home clicked');
        },
        data: {
          label: 'Home',
          ariaLabel: 'Home',
        },
      },
      {
        callback: () => {
          console.log('gallery clicked');
        },
        data: {
          label: 'Gallery',
          ariaLabel: 'gallery',
        },
      },
      {
        callback: () => {
          console.log('images clicked');
        },
        data: {
          label: 'Images',
          ariaLabel: 'Images',
          svgIcon: 'es-48:image-fill-w500-lc',
        },
      },
      {
        callback: () => {
          console.log('info clicked');
        },
        data: {
          label: 'Info',
          ariaLabel: 'Info',
          svgIcon: 'es-48:information-fill-w500-lc',
        },
      },
    ],
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<ESBreadcrumbsComponent>;

export const Primary: Story = {
  name: 'Demo',
  render: (args, context) => ({
    template: `
    <demo-wrapper
    [breadcrumbs]="breadcrumbs"
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
