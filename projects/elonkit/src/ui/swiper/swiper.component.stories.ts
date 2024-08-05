import type { Meta, StoryObj } from '@storybook/angular';
import { CoreModule } from '~storybook/core.module';
import { HttpClientModule } from '@angular/common/http';

import { ESSwiperModule, ESSwiperComponent } from '.';
import { MatIconModule } from '@angular/material/icon';
const meta: Meta<ESSwiperComponent> = {
  component: ESSwiperComponent,
  title: 'ui/Swiper',
  tags: ['autodocs'],
  args: {
    direction: 'vertical',
    alignment: 'start',
    gap: 16,
    snap: false,
    snapStop: false,
    draggable: true,
    loop: false,
    autoPlay: 0,
    autoPlayCount: 1,
    swiperPaginationPosition: 'end',
    swiperPaginationVariant: 'small',
    swiperPaginationSiblingCount: 0,
    swiperPaginationTransitionDuration: 0,
  },
  argTypes: {
    direction: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Orientation of swiper.',
    },
    alignment: {
      control: { type: 'radio' },
      options: ['start', 'center'],
      description: 'Alignment of swiper item.',
    },
    gap: {
      description: 'Space between swiper items.',
    },
    snap: {
      description: 'If true, the element will be center or start aligned.',
    },
    snapStop: {
      description: 'If true, you will only be able to scroll by one item.',
    },
    draggable: {
      description: 'Ability to move swiper items by dragging.',
    },
    loop: {
      description: 'If true, after items ends swiper returns to start.',
    },
    autoPlay: {
      description: "Interval in 'ms' for next swiper item. Don't use timeout less then 100ms.",
    },
    autoPlayCount: {
      description: 'Count of items will be swiped after timeout.',
    },
    swiperPaginationSiblingCount: {
      description: 'Count of shown paginator bullets. 0 - all bullets shown.',
    },
    swiperPaginationTransitionDuration: {
      description: 'Duration of bullets animation (grow, hide, etc...). 150ms as default/',
    },
    swiperPaginationPosition: {
      control: { type: 'radio' },
      options: ['start', 'end', 'none'],
      description: 'Position of swiper pagination',
    },
    swiperPaginationVariant: {
      control: { type: 'radio' },
      options: ['small', 'big', 'long'],
      description: 'Size of bullet',
    },
  },
};

export default meta;

type Story = StoryObj<ESSwiperComponent>;

export const Primary: Story = {
  name: 'Demo',
  render: (args, context) => ({
    template: `
    <es-swiper   style="height: min(512px, -2rem + 100vh); display: block;"
      [direction]="direction"
      [alignment]="alignment"
      [gap]="gap"
      [snap]="snap"
      [snapStop]="snapStop"
      [draggable]="draggable"
      [loop]="loop"
      [autoPlay]="autoPlay"
      [autoPlayCount]="autoPlayCount"
      [swiperPaginationPosition]="swiperPaginationPosition"
      [swiperPaginationVariant]="swiperPaginationVariant"
      [swiperPaginationSiblingCount]="swiperPaginationSiblingCount"
      [swiperPaginationTransitionDuration]="swiperPaginationTransitionDuration">
      <img src="https://placehold.co/160x160/E40303/white">
      <img src="https://placehold.co/160x160/FF8C00/white">
      <img src="https://placehold.co/160x160/FFED00/white">
      <img src="https://placehold.co/160x160/008026/white">
      <img src="https://placehold.co/160x160/24408E/white">
      <img src="https://placehold.co/160x160/732982/white">
      <img src="https://placehold.co/160x160/E40303/white">
      <img src="https://placehold.co/160x160/FF8C00/white">
      <img src="https://placehold.co/160x160/FFED00/white">
      <img src="https://placehold.co/160x160/008026/white">
      <img src="https://placehold.co/160x160/24408E/white">
      <img src="https://placehold.co/160x160/732982/white">
    </es-swiper>
    `,
    props: {
      ...args,
    },
    moduleMetadata: {
      imports: [ESSwiperModule, MatIconModule, HttpClientModule, CoreModule],
    },
  }),
};
