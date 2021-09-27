import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ElementRef,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';
import { UserInfoService } from '../../services/user-info.service';
import { GetItemService } from '../../../core/services/get-item.service';
import { IItem } from '../../../goods/types/item.type';
import { IUserInfo } from '../../types/user-info';
import { SubmitOrderService } from '../../services/submit-order.service';
import { IItemsOrder } from '../../types/order-good';
import { formattingDate } from '../../../shared/utils/formatting-date';
import { DeleteCartService } from '../../services/delete-cart.service';
import { ModalCartSuccessComponent } from '../../components/modal-cart-success/modal-cart-success.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent implements OnInit {
  @ViewChildren('goodCount') goodCounts!: QueryList<ElementRef>;
  @ViewChildren('itemId') itemIds!: QueryList<ElementRef>;
  userInfo$!: Observable<IUserInfo>;
  items!: Observable<IItem>[];
  headerColumns: string[] = ['Товар', 'Количество', 'Доставка', 'Стоимость'];
  initialPriceArr: number[] = [];
  priceArr: number[] = [];
  totalPrice = 0;

  constructor(
    private userInfoService: UserInfoService,
    private getItemService: GetItemService,
    private submitOrderService: SubmitOrderService,
    private deleteCartService: DeleteCartService,
    private modalLocation: MatDialog,
  ) {}

  ngOnInit() {
    this.userInfoService.getUserInfo();
    this.userInfo$ = this.userInfoService.userInfo$;

    this.userInfo$.subscribe((info) => {
      if (info) {
        this.items = info.cart.map((cart) =>
          this.getItemService.getItem(cart).pipe(
            tap((item) => {
              this.priceArr.push(item.price);
              this.initialPriceArr = [...this.priceArr];
            }),
            tap(() => {
              this.totalPrice = Number(this.priceArr.reduce((sum, item) => sum + item).toFixed(2));
              return this.totalPrice;
            }),
          ),
        );
      }
    });
  }

  increment(index: number) {
    this.priceArr[index] = Number((this.priceArr[index] + this.initialPriceArr[index]).toFixed(2));
    this.totalPrice = Number((this.totalPrice + this.initialPriceArr[index]).toFixed(2));
    const currentInput = this.goodCounts.find((element, i) => i === index);
    if (currentInput) {
      currentInput.nativeElement.value = +currentInput.nativeElement.value + 1;
    }
  }

  decrement(index: number) {
    const currentInput = this.goodCounts.find((element, i) => i === index);
    if (currentInput && +currentInput.nativeElement.value !== 0) {
      this.priceArr[index] = Number(
        (this.priceArr[index] - this.initialPriceArr[index]).toFixed(2),
      );
      this.totalPrice = Number((this.totalPrice - this.initialPriceArr[index]).toFixed(2));
      currentInput.nativeElement.value = +currentInput.nativeElement.value - 1;
    }
  }

  deleteCart(id: string) {
    this.deleteCartService.deleteOrder(id);
    this.userInfoService.getUserInfo();
    this.userInfo$ = this.userInfoService.userInfo$;
  }

  submitOrder(orderForm: NgForm) {
    if (orderForm.valid) {
      const date = formattingDate(orderForm.value.date);

      const goodsCountArr = this.goodCounts.map((item) => item.nativeElement.value);
      const itemIdsArr = this.itemIds.map((id) => id.nativeElement.value);

      const itemsOrders: IItemsOrder[] = goodsCountArr.map((goodsCount, index) => ({
        id: itemIdsArr[index],
        amount: goodsCount,
      }));

      this.submitOrderService.submitOrder({
        items: itemsOrders,
        details: {
          name: orderForm.value.name,
          address: orderForm.value.address,
          phone: orderForm.value.tel,
          timeToDeliver: date,
          comment: orderForm.value.comment,
        },
      });
    }
    this.openModalCartSuccessComponent();
    this.userInfoService.getUserInfo();
    this.userInfo$ = this.userInfoService.userInfo$;
    this.totalPrice = 0;
    orderForm.reset();
  }

  openModalCartSuccessComponent() {
    this.modalLocation.open(ModalCartSuccessComponent);
  }
}
