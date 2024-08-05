import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';

import { ESAutocompleteFooterComponent } from './autocomplete-footer/autocomplete-footer.component';
import { ESAutocompleteHeaderComponent } from './autocomplete-header/autocomplete-header.component';
import { ESAutocompleteFieldComponent } from './autocomplete-field.component';

import { ESTooltipModule } from '../tooltip';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    A11yModule,
    OverlayModule,
    ESTooltipModule,
  ],
  exports: [ESAutocompleteFieldComponent, ESAutocompleteFooterComponent, ESAutocompleteHeaderComponent],
  declarations: [ESAutocompleteFieldComponent, ESAutocompleteFooterComponent, ESAutocompleteHeaderComponent],
  providers: [MatIconRegistry],
})
export class ESAutocompleteFieldModule {}
