import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MaterialModule } from './material/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    NgbModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
  ],
  exports: [
    MaterialModule,
    NgbModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
  ],
})
export class SharedModule {}
