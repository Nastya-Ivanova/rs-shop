import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalAuthComponent } from './components/modal-auth/modal-auth.component';
import { MaterialModule } from '../shared/material/material.module';
import { AccountComponent } from './components/account/account.component';
import { ModalRegisterComponent } from './components/modal-register/modal-register.component';
import { RegisterService } from './services/register.service';
import { LocalStorageAuthService } from './services/local-storage-auth.service';
import { UserInfoService } from './services/user-info.service';
import { LoginService } from './services/login.service';

@NgModule({
  declarations: [ModalAuthComponent, AccountComponent, ModalRegisterComponent],
  imports: [CommonModule, MaterialModule, FormsModule],
  exports: [AccountComponent],
  providers: [RegisterService, LocalStorageAuthService, UserInfoService, LoginService],
})
export class UsersModule {}
