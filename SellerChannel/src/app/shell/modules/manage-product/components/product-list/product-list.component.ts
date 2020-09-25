import { Component, OnInit } from '@angular/core';
import { Dispatcher } from 'src/app/app.dispatcher';
import { GoToCreateProduct, GoToEditProduct } from '../../state/manage-product.actions';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  constructor(private dispatcher: Dispatcher) { }

  ngOnInit(): void {
  }


  viewProduct() {

  }

  redirectToUpdate() {
    this.dispatcher.fire(new GoToEditProduct());
  }

  redirectToCreateProduct() {
    return this.dispatcher.fire(new GoToCreateProduct());    
  }

  deleteProduct() {

  }
}
