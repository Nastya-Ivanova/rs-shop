import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatDialogModule, NoopAnimationsModule],
  exports: [MatDialogModule, NoopAnimationsModule],
})
export class MaterialModule {}
