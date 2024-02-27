import { argsToTemplate, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { DialogComponent } from './dialog.component';
import { OverlayComponent } from '../overlay';
import { CommonModule } from '@angular/common';
import { DialogTitleComponent } from './dialog-title/dialog-title.component';
import { DialogContentComponent } from './dialog-content/dialog-content.component';
import { DialogActionsComponent } from './dialog-actions/dialog-actions.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

const meta: Meta<DialogComponent> = {
  title: 'UI/Dialog',
  component: DialogComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      declarations: [DialogTitleComponent, DialogContentComponent, DialogActionsComponent, OverlayComponent],
      imports: [CommonModule, MatButtonModule, MatIconModule],
    }),
  ],
  args: {
    align: 'center',
    disableEscapeKeyDown: false,
    fullScreen: false,
    fullWidth: false,
    hideBackdrop: false,
    maxWidth: '700px',
    transitionDuration: 400,
  },
  render: (args: DialogComponent) => ({
    props: {
      ...args,
    },
    template: `<button mat-raised-button color="primary" (click)="dialog.open()">Открыть</button>
<es-overlay #dialog>
  <es-dialog ${argsToTemplate(args)} [showModal]="dialog.visible" *ngIf="dialog.visible" (onClose)="dialog.close()">
    <es-dialog-title><h3 class="es-h3">Заголовок</h3></es-dialog-title>
    <es-dialog-content>
      <p>
        Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
        quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit
        amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
        consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at
        eros. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
        egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur
        purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus,
        porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum. Cras
        justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac
        Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
        quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit
        amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
        consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at
        eros. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
        egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur
        purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus,
        porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum. Cras
        justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac
        Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
        quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit
        amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
        consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at
        eros. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
        egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur
        purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus,
        porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum. Cras
        justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac
        Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
        quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit
        amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
        consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at
        eros. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
        egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur
        purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus,
        porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum. Cras
        justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac
        Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
        quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit
        amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
        consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at
        eros. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
        egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur
        purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus,
        porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum. Cras
        justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac
        Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
        quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit
        amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
        consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at
        eros. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
        egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur
        purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus,
        porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum. Cras
        justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac
        Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
        quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit
        amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
        consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at
        eros. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
        egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur
        purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus,
        porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum. Cras
        justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac
        Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
        quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit
        amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
        consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at
        eros. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
        egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur
        purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus,
        porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum. Cras
        justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac
        Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
        quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit
        amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
        consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at
        eros. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
        egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur
        purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus,
        porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum. Cras
        justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac
        Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
        quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit
        amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
        consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at
        eros. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
        egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur
        purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus,
        porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum. Cras
        justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac
        Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
        quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit
        amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
        consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at
        eros. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
        egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur
        purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus,
        porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum. Cras
        justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac
        Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
        quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit
        amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
        consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at
        eros. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
        egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur
        purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus,
        porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum. Cras
        justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac

      </p></es-dialog-content>
    <es-dialog-actions [align]="'end'">
      <button mat-stroked-button (click)="dialog.close()">
        Отмена
      </button>
      <button mat-raised-button color="primary" (click)="save(); dialog.close()">
        Создать
      </button>
    </es-dialog-actions>
  </es-dialog>
</es-overlay>`,
  }),
};

export default meta;
type Story = StoryObj<DialogComponent>;

export const Demo: Story = {};

export const Aligment: Story = {
  args: {
    align: 'start',
  },
  render: (args: DialogComponent) => ({
    props: {
      ...args,
    },
    template: `<button mat-raised-button color="primary" (click)="dialog.open()">Открыть</button>
<es-overlay #dialog>
  <es-dialog ${argsToTemplate(args)} [showModal]="dialog.visible" *ngIf="dialog.visible" (onClose)="dialog.close()">
    <es-dialog-title><h3 class="es-h3">Заголовок</h3></es-dialog-title>
    <es-dialog-content>
      <p>
        Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
        quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit
        amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
        consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at

      </p></es-dialog-content>
    <es-dialog-actions [align]="'end'">
      <button mat-stroked-button (click)="dialog.close()">
        Отмена
      </button>
      <button mat-raised-button color="primary" (click)="save(); dialog.close()">
        Создать
      </button>
    </es-dialog-actions>
  </es-dialog>
</es-overlay>`,
  }),
};
