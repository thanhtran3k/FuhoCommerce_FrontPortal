import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Shell } from 'src/app/shell/shell.service';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'product-list', component: ProductListComponent },
    { path: 'create-product', component: CreateProductComponent },
    { path: 'update-product', component: UpdateProductComponent }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ManageProductRoutingModule { }