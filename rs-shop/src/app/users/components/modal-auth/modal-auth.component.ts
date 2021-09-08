import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { ModalRegisterComponent } from '../modal-register/modal-register.component';
import { LoginService } from '../../services/login.service';
import { LocalStorageAuthService } from '../../services/local-storage-auth.service';
import { UserInfoService } from '../../services/user-info.service';

@Component({
  selector: 'app-modal-auth',
  templateUrl: './modal-auth.component.html',
  styleUrls: ['./modal-auth.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalAuthComponent {
  isUnauthorized = false;

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ModalAuthComponent>,
    private loginService: LoginService,
    private localStorageAuthService: LocalStorageAuthService,
    private userInfoService: UserInfoService,
  ) {}

  signIn(signInForm: NgForm) {
    const token$ = this.loginService.setLogin({
      login: signInForm.value.login,
      password: signInForm.value.password,
    });
    token$.subscribe(
      (response) => {
        this.localStorageAuthService.setToken(response.token);
        this.userInfoService.getUserInfo(response.token);
        this.dialogRef.close();
      },
      () => {
        this.isUnauthorized = true;
      },
    );
  }

  openModalRegister() {
    this.dialog.open(ModalRegisterComponent);
  }
}
