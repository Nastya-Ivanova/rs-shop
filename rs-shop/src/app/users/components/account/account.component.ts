import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ModalAuthComponent } from '../modal-auth/modal-auth.component';
import { LocalStorageAuthService } from '../../services/local-storage-auth.service';
import { UserInfoService } from '../../services/user-info.service';
import { IUserInfo } from '../../types/user-info';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountComponent implements OnInit {
  userInfo$!: Observable<IUserInfo | null>;

  constructor(
    public modalLocation: MatDialog,
    private localStorageAuthService: LocalStorageAuthService,
    private userInfoService: UserInfoService,
  ) {}

  ngOnInit() {
    this.userInfo$ = this.userInfoService.userInfo$;
  }

  openModalAuth() {
    this.modalLocation.open(ModalAuthComponent);
  }
}
