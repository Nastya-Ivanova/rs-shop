import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCarouselModule } from '@ngbmodule/material-carousel';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    MatCarouselModule,
    MatCardModule,
    MatButtonModule,
  ],
  exports: [
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    MatCarouselModule,
    MatCardModule,
    MatButtonModule,
  ],
})
export class MaterialModule {}
