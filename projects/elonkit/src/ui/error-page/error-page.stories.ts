import type { Meta, StoryObj } from '@storybook/angular';
import { CoreModule } from '~storybook/core.module';
import { HttpClientModule } from '@angular/common/http';

import { ESErrorPageModule, ESErrorPageComponent } from '.';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

const meta: Meta<ESErrorPageComponent> = {
  component: ESErrorPageComponent,
  title: 'ui/Error page',
  tags: ['autodocs'],
  args: {
    imageUrl: 'https://picsum.photos/1000/1200',
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<ESErrorPageComponent>;

export const Primary: Story = {
  name: 'Demo',
  render: (args, context) => ({
    template: `
      <es-error-page [imageUrl]='imageUrl'>
        <es-error-page-logo>
          <header class="es-body-200">LOGO</header>
        </es-error-page-logo>
        <es-error-page-status>
          <mat-icon svgIcon="es-error-page:error-403"></mat-icon>
        </es-error-page-status>
        <es-error-page-heading>
          <h1 class="es-h3">Permission denied</h1>
        </es-error-page-heading>
        <es-error-page-description>
          <p class="es-body-200">You do not have permission to view this page or perform this operation.</p>
        </es-error-page-description>
        <es-error-page-actions>
         <button mat-stroked-button class="es-body-100"><mat-icon>keyboard_backspace</mat-icon>BACK</button>
         <button mat-stroked-button class="es-body-100" color="primary">MAIN PAGE</button>
        </es-error-page-actions>
        <es-error-page-footer class="es-body-100">
          Error code 403
        </es-error-page-footer>
      </es-error-page>
    `,
    props: {
      ...args,
    },
    moduleMetadata: {
      imports: [ESErrorPageModule, MatIconModule, HttpClientModule, CoreModule, MatButtonModule],
    },
  }),
};
