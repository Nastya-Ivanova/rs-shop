import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from './material/material.module';

@NgModule({
  imports: [CommonModule, MaterialModule, NgbModule],
  exports: [MaterialModule, NgbModule],
})
export class SharedModule {}
