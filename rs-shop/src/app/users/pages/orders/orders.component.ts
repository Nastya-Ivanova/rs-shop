import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChildren,
  QueryList,
  ElementRef,
  Renderer2,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserInfoService } from '../../services/user-info.service';
import { IUserInfo } from '../../types/user-info';
import { IItem } from '../../../goods/types/item.type';
import { GetItemService } from '../../../core/services/get-item.service';
import { DeleteOrderService } from '../../services/delete-order.service';
import { EditOrderService } from '../../services/edit-order.service';
import { ModalOrderSuccessComponent } from '../../components/modal-order-success/modal-order-success.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent implements OnInit, OnDestroy {
  @ViewChildren('editField') editFields!: QueryList<ElementRef>;
  @ViewChild('editBtn') editBtn!: ElementRef;
  @ViewChild('saveBtn') saveBtn!: ElementRef;
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
    private modalLocation: MatDialog,
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
    this.renderer.removeClass(this.editBtn.nativeElement, 'disabled');
    this.renderer.removeClass(this.saveBtn.nativeElement, 'disabled');
    this.editFields.map((field) => this.renderer.removeClass(field.nativeElement, 'disabled'));
  }

  resetEdit() {
    this.renderer.addClass(this.editBtn.nativeElement, 'disabled');
    this.editFields.map((field) => this.renderer.addClass(field.nativeElement, 'disabled'));
  }

  submitEditOrder(
    id: string,
    name: string,
    address: string,
    phone: string,
    timeToDeliver: string,
    comment: string,
    orderForm: NgForm,
  ) {
    if (orderForm.valid) {
      this.renderer.removeClass(this.saveBtn.nativeElement, 'disabled');
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
      this.renderer.addClass(this.saveBtn.nativeElement, 'disabled');
      this.openModalOrderSuccessComponent();
    }
  }

  deleteOrder(id: string) {
    this.deleteOrderService.deleteOrder(id);
    this.userInfoService.getUserInfo();
    this.userInfo$ = this.userInfoService.userInfo$;
  }

  openModalOrderSuccessComponent() {
    this.modalLocation.open(ModalOrderSuccessComponent);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
