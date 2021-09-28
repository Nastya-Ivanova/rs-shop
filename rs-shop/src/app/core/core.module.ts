import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { ModalLocationComponent } from './components/modal-location/modal-location.component';
import { MaterialModule } from '../shared/material/material.module';
import { GetLocationService } from './services/get-location.service';
import { UsersModule } from '../users/users.module';
import { AppRoutingModule } from '../app-routing.module';
import { SearchService } from './services/search.service';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [HeaderComponent, ModalLocationComponent, FooterComponent],
  imports: [CommonModule, MaterialModule, FormsModule, UsersModule, AppRoutingModule],
  exports: [HeaderComponent, FooterComponent],
  providers: [GetLocationService, SearchService],
})
export class CoreModule {}
