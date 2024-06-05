import { argsToTemplate, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { MadeByComponent } from './made-by.component';
import {HttpClientModule} from '@angular/common/http';
import {CoreModule} from '~storybook/core.module';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldControl, MatFormFieldModule} from '@angular/material/form-field';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {OverlayModule} from '@angular/cdk/overlay';

const meta: Meta<MadeByComponent> = {
  title: 'UI/MadeBy',
  component: MadeByComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      declarations: [MadeByComponent],
      imports: [CommonModule, MatButtonModule, MatIconModule],
    }),
  ],
  render: (args: MadeByComponent) => ({
    props: {
      ...args,
    },
    template: `<es-made-by class="es-body-200" ${argsToTemplate(args)}></es-made-by>`,
  }),
};

export default meta;
type Story = StoryObj<MadeByComponent>

export const Demo: Story = {};
