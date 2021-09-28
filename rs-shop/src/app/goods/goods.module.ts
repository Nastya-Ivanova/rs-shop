import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { GoodsComponent } from './pages/goods/goods.component';
import { GoodsRoutingModule } from './goods-routing.module';
import { MainComponent } from './pages/main/main.component';
import { GetItemsService } from './services/get-items.service';
import { SliderComponent } from './components/slider/slider.component';
import { ItemComponent } from './pages/item/item.component';
import { PopularGoodsComponent } from './components/popular-goods/popular-goods.component';
import { SharedModule } from '../shared/shared.module';
import { SubcategoryComponent } from './pages/subcategory/subcategory.component';
import { GoodsAvailableAmountDirective } from './directives/goods-available-amount.directive';
import { FormattingPricePipe } from './pipes/formatting-price.pipe';
import { SortByPipe } from './pipes/sort-by.pipe';
import { CartComponent } from '../users/pages/cart/cart.component';

@NgModule({
  declarations: [
    GoodsComponent,
    MainComponent,
    SliderComponent,
    ItemComponent,
    PopularGoodsComponent,
    SubcategoryComponent,
    SliderComponent,
    GoodsAvailableAmountDirective,
    FormattingPricePipe,
    SortByPipe,
    CartComponent,
  ],
  imports: [
    GoodsRoutingModule,
    CommonModule,
    SharedModule,
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
  ],
  providers: [GetItemsService],
  exports: [FormattingPricePipe],
})
export class GoodsModule {}
