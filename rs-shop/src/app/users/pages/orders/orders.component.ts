import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChildren,
  QueryList,
  ElementRef,
  Renderer2,
  OnDestroy,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserInfoService } from '../../services/user-info.service';
import { IUserInfo } from '../../types/user-info';
import { IItem } from '../../../goods/types/item.type';
import { GetItemService } from '../../../core/services/get-item.service';
import { DeleteOrderService } from '../../services/delete-order.service';
import { EditOrderService } from '../../services/edit-order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent implements OnInit, OnDestroy {
  @ViewChildren('editField') editFields!: QueryList<ElementRef>;
  userInfo$!: Observable<IUserInfo>;
  items!: Observable<IItem>[];
  goodsAmount: number[] = [];
  panelOpenState = false;
  subscription = new Subscription();
  orders!: Observable<IItem>[][];

  constructor(
    private userInfoService: UserInfoService,
    public getItemService: GetItemService,
    private deleteOrderService: DeleteOrderService,
    private editOrderService: EditOrderService,
    private renderer: Renderer2,
  ) {}

  ngOnInit() {
    this.userInfoService.getUserInfo();
    this.userInfo$ = this.userInfoService.userInfo$;

    this.subscription = this.userInfo$.subscribe((info) => {
      if (info) {
        this.orders = info.orders.map((order) =>
          order.items.map((item) => {
            this.goodsAmount.push(item.amount);
            return this.getItemService.getItem(item.id);
          }),
        );
      }
    });
  }

  editOrder() {
    this.editFields.map((field) => this.renderer.removeAttribute(field.nativeElement, 'disabled'));
  }

  resetEdit() {
    this.editFields.map((field) =>
      this.renderer.setAttribute(field.nativeElement, 'disabled', 'disabled'),
    );
  }

  submitEditOrder(
    id: string,
    name: string,
    address: string,
    phone: string,
    timeToDeliver: string,
    comment: string,
  ) {
    this.editOrderService.editOrder({
      id,
      details: {
        name,
        address,
        phone,
        timeToDeliver,
        comment,
      },
    });
    this.resetEdit();
  }

  deleteOrder(id: string) {
    this.deleteOrderService.deleteOrder(id);
    this.userInfoService.getUserInfo();
    this.userInfo$ = this.userInfoService.userInfo$;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
