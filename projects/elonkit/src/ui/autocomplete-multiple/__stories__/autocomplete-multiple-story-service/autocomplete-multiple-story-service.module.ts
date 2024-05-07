import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';

import { AutocompleteMultipleStoryServiceComponent } from './autocomplete-multiple-story-service.component';
import { AutocompleteMultipleStoryService } from './autocomplete-multiple-story-service.service';

import { CoreModule } from '../../../../../.storybook/core.module';
import { ESAutocompleteMultipleModule } from '../..';

@NgModule({
  declarations: [AutocompleteMultipleStoryServiceComponent],
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, CoreModule, ESAutocompleteMultipleModule],
  exports: [AutocompleteMultipleStoryServiceComponent],
  providers: [AutocompleteMultipleStoryService],
})
export class AutocompleteMultipleStoryServiceModule {}
