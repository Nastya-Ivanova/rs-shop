import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfoService } from '../../services/user-info.service';
import { IUserInfo } from '../../types/user-info';
import { IItem } from '../../../goods/types/item.type';
import { GetItemService } from '../../../core/services/get-item.service';
import { AddToCartService } from '../../../core/services/add-to-cart.service';
import { DeleteFromFavoriteService } from '../../services/delete-from-favorite.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesComponent implements OnInit {
  userInfo$!: Observable<IUserInfo> | null;
  items!: Observable<IItem>[];

  constructor(
    private userInfoService: UserInfoService,
    private getItemService: GetItemService,
    private addToCartService: AddToCartService,
    private deleteFromFavoriteService: DeleteFromFavoriteService,
  ) {}

  ngOnInit() {
    this.userInfoService.getUserInfo();
    this.userInfo$ = this.userInfoService.userInfo$;

    this.userInfo$.subscribe((info) => {
      if (info) {
        this.items = info.favorites.map((favorite) => this.getItemService.getItem(favorite));
      }
    });
  }

  addToCart(id: string) {
    this.addToCartService.addToCart(id);
  }

  deleteFromFavorite(id: string) {
    this.deleteFromFavoriteService.deleteFromFavorite(id);
    this.userInfoService.getUserInfo();
  }
}
