import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoodsComponent } from './pages/goods/goods.component';
import { MainComponent } from './pages/main/main.component';
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
        path: ':catNum',
        component: GoodsComponent,
      },
      {
        path: ':catNum/:categoryId/:subCategoryId',
        component: SubcategoryComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoodsRoutingModule {}
