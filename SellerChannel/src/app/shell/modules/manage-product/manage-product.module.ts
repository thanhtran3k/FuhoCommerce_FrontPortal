import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageProductComponent } from './manage-product.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { ManageProductRoutingModule } from './manage-product-routing';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ManageProductComponent, 
    ProductListComponent, 
    CreateProductComponent, 
    UpdateProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ManageProductRoutingModule
  ]
})
export class ManageProductModule { }
