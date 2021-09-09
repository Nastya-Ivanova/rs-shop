import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoodsComponent } from './pages/goods/goods.component';
import { GoodsRoutingModule } from './goods-routing.module';

@NgModule({
  declarations: [GoodsComponent],
  imports: [GoodsRoutingModule, CommonModule],
  providers: [],
})
export class GoodsModule {}
