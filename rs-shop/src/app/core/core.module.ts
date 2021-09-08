import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { ModalLocationComponent } from './components/modal-location/modal-location.component';
import { MaterialModule } from '../shared/material/material.module';
import { GetLocationService } from './services/get-location.service';
import { UsersModule } from '../users/users.module';

@NgModule({
  declarations: [HeaderComponent, ModalLocationComponent],
  imports: [CommonModule, MaterialModule, FormsModule, UsersModule],
  exports: [HeaderComponent],
  providers: [GetLocationService],
})
export class CoreModule {}
