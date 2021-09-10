import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCarouselModule } from '@ngbmodule/material-carousel';
import { GoodsComponent } from './pages/goods/goods.component';
import { GoodsRoutingModule } from './goods-routing.module';
import { MainComponent } from './pages/main/main.component';
import { GetItemsService } from './sevices/get-items.service';
import { SliderComponent } from './components/slider/slider.component';
import { GetItemService } from './sevices/get-item.service';
import { ItemComponent } from './pages/item/item.component';

@NgModule({
  declarations: [GoodsComponent, MainComponent, SliderComponent, ItemComponent],
  imports: [GoodsRoutingModule, CommonModule, MatCarouselModule],
  providers: [GetItemsService, GetItemService],
})
export class GoodsModule {}
