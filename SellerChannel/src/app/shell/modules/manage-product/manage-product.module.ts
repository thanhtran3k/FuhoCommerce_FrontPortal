import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageProductComponent } from './manage-product.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { ManageProductRoutingModule, routes } from './manage-product-routing';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ManageProductEffects } from './state/manage-product.effects';
import { manageProductReducer } from './state/manage-product.reducer';
import { ManageProductSelectors } from './state/manage-product.selectors';
import { ManageProductServices } from 'src/app/shared/services/manage-product/manage-product.service';

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
    ManageProductRoutingModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([ManageProductEffects]),
    StoreModule.forFeature('ManageProductModule', manageProductReducer),
  ],
  providers: [
    // AuthGuard,
    ManageProductServices,
    ManageProductSelectors
  ]
})
export class ManageProductModule { }
