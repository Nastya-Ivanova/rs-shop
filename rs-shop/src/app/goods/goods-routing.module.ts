import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoodsComponent } from './pages/goods/goods.component';
import { MainComponent } from './pages/main/main.component';
import { ItemComponent } from './pages/item/item.component';
import { SubcategoryComponent } from './pages/subcategory/subcategory.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'goods',
    children: [
      {
        path: '',
        component: GoodsComponent,
      },
      {
        path: ':categoryId/:subCategoryId',
        component: SubcategoryComponent,
      },
    ],
  },
  {
    path: 'goods/item/:id',
    component: ItemComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoodsRoutingModule {}
