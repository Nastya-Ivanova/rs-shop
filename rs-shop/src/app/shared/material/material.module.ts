import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatDialogModule, NoopAnimationsModule, MatMenuModule],
  exports: [MatDialogModule, NoopAnimationsModule, MatMenuModule],
})
export class MaterialModule {}
