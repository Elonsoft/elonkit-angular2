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
      description: 'Color of sidebar contnent.',
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
      description: "Behavior of openning item's dropdowns.",
    },
    exclusive: {
      description:
        'If the parameter is true, the open menu of a nested component will be closed when another component is opened.',
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

    <!-- Demo layout
    <es-sidebar
    [color]="color"
    [width]="width"
    [maxWidth]="maxWidth"
    [minWidth]="minWidth"
    [isOpen]="isOpen"
    style="position: sticky; top: 0;">
    <es-sidebar-menu [behaviour]="behavior" [exclusive]="exclusive">
      <es-sidebar-item [color]="color" [isOpen]="isOpen" text="CRM" icon="es-24:at-line-w500"></es-sidebar-item>
    </es-sidebar-menu>
    <es-sidebar-toggle (openEvent)="isOpen = $event" [color]="color"></es-sidebar-toggle>
    <es-sidebar-menu [behaviour]="behavior" [exclusive]="exclusive">
      <es-sidebar-item
        (itemClick)="onElementValueClick('Work Time')"
        [color]="color"
        [isOpen]="isOpen"
        icon="es-24:at-line-w500"
        text="Work Time">
      </es-sidebar-item>
    </es-sidebar-menu>
    <es-sidebar-divider [color]="color" [isOpen]="isOpen"></es-sidebar-divider>

    <es-sidebar-scrollable>
      <es-sidebar-menu [behaviour]="behavior" [exclusive]="exclusive">
        <es-sidebar-item
          (itemClick)="onElementValueClick('Projects')"
          [color]="color"
          [isOpen]="isOpen"
          [isExpandClicable]="true"
          id="0"
          icon="es-24:at-line-w500"
          text="Projects"
          [selected]="true">
          <ng-template #items>
            <es-sidebar-item
              (itemClick)="onElementValueClick('Project №0')"
              [color]="color"
              [isOpen]="isOpen"
              text="Project №0"
              [inset]="true"></es-sidebar-item>
            <es-sidebar-item
              (itemClick)="onElementValueClick('Project №1')"
              [color]="color"
              [isOpen]="isOpen"
              text="Project №1"
              [inset]="true"></es-sidebar-item>
            <es-sidebar-item
              (itemClick)="onElementValueClick('Project №2')"
              [color]="color"
              [isOpen]="isOpen"
              text="Project №2"
              [inset]="true"
              [selected]="true"></es-sidebar-item>
            <es-sidebar-item [color]="color" [isOpen]="isOpen" text="Project №3" [inset]="true"></es-sidebar-item>
            <es-sidebar-item [color]="color" [isOpen]="isOpen" text="Project №4" [inset]="true"></es-sidebar-item>
          </ng-template>
        </es-sidebar-item>
        <es-sidebar-item
          (itemClick)="onElementClick()"
          [color]="color"
          [isOpen]="isOpen"
          id="1"
          icon="es-24:at-line-w500"
          text="Files">
          <ng-template #items>
            <es-sidebar-item [color]="color" [isOpen]="isOpen" text="File №0" [inset]="true"></es-sidebar-item>
            <es-sidebar-item [color]="color" [isOpen]="isOpen" text="File №1" [inset]="true"></es-sidebar-item>
            <es-sidebar-item [color]="color" [isOpen]="isOpen" text="File №2" [inset]="true"></es-sidebar-item>
            <es-sidebar-item [color]="color" [isOpen]="isOpen" text="File №3" [inset]="true"></es-sidebar-item>
            <es-sidebar-item [color]="color" [isOpen]="isOpen" text="File №4" [inset]="true"></es-sidebar-item>
            <es-sidebar-item [color]="color" [isOpen]="isOpen" text="File №5" [inset]="true"></es-sidebar-item>
            <es-sidebar-item [color]="color" [isOpen]="isOpen" text="File №6" [inset]="true"></es-sidebar-item>
            <es-sidebar-item [color]="color" [isOpen]="isOpen" text="File №7" [inset]="true"></es-sidebar-item>
          </ng-template>
        </es-sidebar-item>
        <es-sidebar-item [color]="color" [isOpen]="isOpen" icon="es-24:at-line-w500" text="Infographic"> </es-sidebar-item>
        <es-sidebar-item [color]="color" [isOpen]="isOpen" icon="es-24:at-line-w500" text="Schedule"> </es-sidebar-item>
        <es-sidebar-item [color]="color" [isOpen]="isOpen" icon="es-24:at-line-w500" text="Messages"> </es-sidebar-item>
        <es-sidebar-item [color]="color" [isOpen]="isOpen" icon="es-24:at-line-w500" text="Inbox"> </es-sidebar-item>
      </es-sidebar-menu>
      <es-sidebar-divider role="after-scroll-content" [color]="color" [isOpen]="isOpen"></es-sidebar-divider>
    </es-sidebar-scrollable>

    <es-sidebar-spacer></es-sidebar-spacer>
    <es-sidebar-menu [behaviour]="behavior" [exclusive]="exclusive">
      <es-sidebar-item [color]="color" [isOpen]="isOpen" icon="es-24:magnify-2-line-w500" text="Search"> </es-sidebar-item>
      <es-sidebar-item [color]="color" [isOpen]="isOpen" icon="es-24:bell-line-line-w500" text="Notifications">
      </es-sidebar-item>
    </es-sidebar-menu>
    <es-sidebar-divider [color]="color" [isOpen]="isOpen"></es-sidebar-divider>
    <es-sidebar-menu [behaviour]="behavior" [exclusive]="exclusive">
      <es-sidebar-item [color]="color" [isOpen]="isOpen" icon="es-24:account-line-w500" text="Name"> </es-sidebar-item>
    </es-sidebar-menu>
  </es-sidebar>
    -->
    `,
    props: {
      ...args,
    },
    moduleMetadata: {
      imports: [DemoWrapperModule, HttpClientModule, CoreModule, BrowserAnimationsModule],
    },
  }),
};
