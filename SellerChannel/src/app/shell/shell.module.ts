import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShellComponent } from './shell.component';
import { HeaderComponent } from './header/header.component';
import { ManageProductModule } from './modules/manage-product/manage-product.module';

@NgModule({  
  declarations: [
    ShellComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ManageProductModule
  ],
})
export class ShellModule { }
