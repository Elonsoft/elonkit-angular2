import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';

import { ESDropzoneComponent } from './dropzone.component';

@NgModule({
  declarations: [ESDropzoneComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatRippleModule, HttpClientModule],
  exports: [ESDropzoneComponent],
  providers: [MatIconRegistry],
})
export class ESDropzoneModule {}
