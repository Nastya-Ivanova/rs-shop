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
import { UsersRoutingModule } from './users-routing.module';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { GoodsModule } from '../goods/goods.module';
import { DeleteFromFavoriteService } from './services/delete-from-favorite.service';
import { SubmitOrderService } from './services/submit-order.service';
import { OrdersComponent } from './pages/orders/orders.component';
import { SharedModule } from '../shared/shared.module';
import { DeleteOrderService } from './services/delete-order.service';
import { EditOrderService } from './services/edit-order.service';
import { DeleteCartService } from './services/delete-cart.service';
import { ModalCartSuccessComponent } from './components/modal-cart-success/modal-cart-success.component';
import { ModalOrderSuccessComponent } from './components/modal-order-success/modal-order-success.component';

@NgModule({
  declarations: [
    ModalAuthComponent,
    AccountComponent,
    ModalRegisterComponent,
    FavoritesComponent,
    OrdersComponent,
    ModalCartSuccessComponent,
    ModalOrderSuccessComponent,
  ],
  imports: [
    UsersRoutingModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    GoodsModule,
    SharedModule,
  ],
  exports: [AccountComponent],
  providers: [
    RegisterService,
    LocalStorageAuthService,
    UserInfoService,
    LoginService,
    DeleteFromFavoriteService,
    SubmitOrderService,
    DeleteOrderService,
    EditOrderService,
    DeleteCartService,
  ],
})
export class UsersModule {}
