import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CoreModule } from '~storybook/core.module';
import { HttpClientModule } from '@angular/common/http';
import { ESAvatarComponent } from './avatar.component';

import { ESAvatarModule } from './avatar.module';
import { MatIconModule } from '@angular/material/icon';
import { ESAvatarGroupComponent } from './avatar-group.component';

const meta: Meta<ESAvatarComponent> = {
  component: ESAvatarComponent,
  subcomponents: { ESAvatarGroupComponent },
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [ESAvatarModule, MatIconModule, HttpClientModule, CoreModule],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['round', 'square'],
    },
    size: {
      control: { type: 'number', min: 20, max: 200, step: 5 },
    },
  },
};

export default meta;

type StoryAvatar = StoryObj<ESAvatarComponent>;
type StoryAvatarGroup = StoryObj<ESAvatarGroupComponent>;

export const Primary: StoryAvatar = {
  name: 'Image',
  args: {
    size: 40,
    alt: 'some image',
    src: 'https://images.pexels.com/photos/682361/pexels-photo-682361.jpeg',
    variant: undefined,
  },
  render: (args, context) => ({
    template: `
    <es-avatar
    [size]="size"
    [alt]="alt"
    [src]="src"
    [variant]="variant"
    ></es-avatar>
    `,
    props: {
      ...args,
    },
  }),
};

export const Secondary: StoryAvatar = {
  name: 'Icon',
  args: {
    size: 40,
    variant: undefined,
  },
  render: (args, context) => ({
    template: `
    <es-avatar
    [size]="size"
    [variant]="variant"
    >
    <mat-icon svgIcon="es-24:at-line-w500"></mat-icon>
    </es-avatar>
    `,
    props: {
      ...args,
    },
  }),
};

export const Third: StoryAvatar = {
  name: 'Text',
  args: {
    size: 40,
    variant: undefined,
  },
  render: (args, context) => ({
    template: `
    <es-avatar
    [size]="size"
    [variant]="variant"
    >
    TEXT
    </es-avatar>
    `,
    props: {
      ...args,
    },
  }),
};

export const Fourth: StoryAvatarGroup = {
  name: 'Group',
  args: {
    size: 40,
    spacing: 2,
    cutoutWidth: 2,
    reverse: false,
  },
  render: (args, context) => ({
    template: `
    <es-avatar-group
    [size]="size"
    [spacing]="spacing"
    [cutoutWidth]="cutoutWidth"
    [reverse]="reverse"
  >
    <es-avatar
      [size]="size"
      [alt]="alt"
      src="https://images.pexels.com/photos/19026488/pexels-photo-19026488/free-photo-of-close-up-of-wolf-head.jpeg"
    ></es-avatar>
    <es-avatar
      [size]="size"
      [alt]="alt"
      src="https://images.pexels.com/photos/918596/pexels-photo-918596.jpeg"
    ></es-avatar>
    <es-avatar
      [size]="size"
      [alt]="alt"
      src="https://images.pexels.com/photos/682361/pexels-photo-682361.jpeg"
    ></es-avatar>
  </es-avatar-group>
    `,
    props: {
      ...args,
    },
  }),
};
