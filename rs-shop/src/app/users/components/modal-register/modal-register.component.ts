import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalAuthComponent } from '../modal-auth/modal-auth.component';
import { RegisterService } from '../../services/register.service';
import { LocalStorageAuthService } from '../../services/local-storage-auth.service';

@Component({
  selector: 'app-modal-register',
  templateUrl: './modal-register.component.html',
  styleUrls: ['./modal-register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalRegisterComponent {
  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ModalRegisterComponent>,
    private authService: RegisterService,
    private localStorageAuthService: LocalStorageAuthService,
  ) {}

  openModalAuth() {
    this.dialog.open(ModalAuthComponent);
  }

  submitRegisterForm(registerForm: NgForm) {
    if (registerForm.valid) {
      const token$ = this.authService.registerUser({
        firstName: registerForm.value.firstName,
        lastName: registerForm.value.lastName,
        login: registerForm.value.email,
        password: registerForm.value.password,
      });

      token$.subscribe((response) => this.localStorageAuthService.setToken(response.token));
      this.dialogRef.close();
    }
  }
}
