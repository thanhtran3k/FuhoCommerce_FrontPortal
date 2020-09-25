import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { API_URI } from 'src/environments/app.config';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ManageProduct } from '../../model/manage-product/manage-product.model';
import { ProductDto } from '../../model/manage-product/productDto.model';

@Injectable()
export class ManageProductServices extends BaseService {
    constructor(protected http: HttpClient) {
        super(http);
        this.baseUrl = (environment.ApiUrl || '') + API_URI.product
    }

    //Hard code to test
    getAllProducts(userId: string, pageIndex: number, pageSize: number): Observable<ManageProduct[]> {
        const url = `/GetProductsSC?userId=${userId}&page=${pageIndex}&pageSize=${pageSize}`;
        return this.get<ManageProduct[]>(url);
    };

    getProductDetails(productId: string): Observable<ProductDto> {
        const url = `/GetProductById/${productId}`;
        return this.get<ProductDto>(url);
    };
}