import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Shell } from 'src/app/shell/shell.service';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { AuthGuard } from 'src/app/core/authentication/auth.guard';

export const routes: Routes = [
  Shell.childRoutes([
    { path: 'product-list', component: ProductListComponent, canActivate: [AuthGuard] },
    { path: 'create-product', component: CreateProductComponent, canActivate: [AuthGuard] },
    { path: 'update-product', component: UpdateProductComponent, canActivate: [AuthGuard] }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ManageProductRoutingModule { }