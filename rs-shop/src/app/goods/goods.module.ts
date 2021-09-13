import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoodsComponent } from './pages/goods/goods.component';
import { GoodsRoutingModule } from './goods-routing.module';
import { MainComponent } from './pages/main/main.component';
import { GetItemsService } from './services/get-items.service';
import { SliderComponent } from './components/slider/slider.component';
import { GetItemService } from './services/get-item.service';
import { ItemComponent } from './pages/item/item.component';
import { PopularGoodsComponent } from './components/popular-goods/popular-goods.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    GoodsComponent,
    MainComponent,
    SliderComponent,
    ItemComponent,
    PopularGoodsComponent,
  ],
  imports: [GoodsRoutingModule, CommonModule, SharedModule],
  providers: [GetItemsService, GetItemService],
})
export class GoodsModule {}
