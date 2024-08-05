import type { Meta, StoryObj } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '~storybook/core.module';
import { HttpClientModule } from '@angular/common/http';
import { ESDropzoneComponent } from './dropzone.component';

import { DemoWrapperModule, DemoWrapperComponent } from './demo-wrapper';

const meta: Meta<DemoWrapperComponent> = {
  component: DemoWrapperModule,
  title: 'ui/Dropzone',
  tags: ['autodocs'],
  args: {
    heading: 'DROP FILES HERE',
    subheading: 'or drag it into this area',
    accept: '',
    matIcon: undefined,
    svgIcon: undefined,
    maxSize: undefined,
    type: undefined,
    headingTypography: '',
    subheadingTypography: '',
  },
  argTypes: {
    heading: {
      description: 'Heading string',
    },
    subheading: {
      description: 'Subheading string',
    },
    accept: {
      control: { type: 'select' },
      options: ['image/png,image/jpg,image/jpeg', 'image/png', 'image/jpg', 'image/jpeg'],
      description: 'File types to accept separated by a comma, e.g. `image/png,image/jpg,image/jpeg`',
    },
    matIcon: {
      control: { type: 'select' },
      options: ['', 'attachment', 'cloud_upload', 'collections'],
      description: 'Material icon to render with `chooseText`',
    },
    svgIcon: {
      control: { type: 'select' },
      options: ['', 'es-24:upload-fill-w500', 'es-24:image-multiple-line-w500', 'es-24:attachment-line-w500'],
      description: 'Custom svg icon to render with `chooseText`',
    },
    maxSize: {
      control: { type: 'number' },
      description: 'Max accepted file size in megabytes.',
    },
    type: {
      control: { type: 'select' },
      options: [undefined, 'base64', 'binary'],
      description: 'Defines if ESDropzoneFile `content` property will be `base64` or `binary` format.',
    },
    headingTypography: {
      control: { type: 'select' },
      options: ['', 'es-h1', 'es-h2', 'es-h3', 'es-h4', 'es-h5', 'es-h6', 'es-body-100', 'es-body-200', 'es-caption'],
      description: 'Class applied to heading text',
    },
    subheadingTypography: {
      control: { type: 'select' },
      options: ['', 'es-h1', 'es-h2', 'es-h3', 'es-h4', 'es-h5', 'es-h6', 'es-body-100', 'es-body-200', 'es-caption'],
      description: 'Class applied to subheading text',
    },
  },
};

export default meta;

type Story = StoryObj<ESDropzoneComponent>;

export const Primary: Story = {
  name: 'Demo',
  render: (args, context) => ({
    template: `
    <demo-wrapper
    [heading]="heading"
    [subheading]="subheading"
    [accept]="accept"
    [matIcon]="matIcon"
    [svgIcon]="svgIcon"
    [maxSize]="maxSize"
    [type]="type"
    [headingTypography]="headingTypography"
    [subheadingTypography]="subheadingTypography"
    >
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
