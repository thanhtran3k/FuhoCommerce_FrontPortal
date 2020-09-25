import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ManageProductActionNames, GetAllProductsAction, ManageProductSuccessAction, ManageProductFailedAction, GetProductDetailsAction } from './manage-product.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { ManageProductServices } from 'src/app/shared/services/manage-product/manage-product.service';
import { of } from 'rxjs';

@Injectable()
export class ManageProductEffects {
    constructor(
        private router: Router,
        private actions$: Actions,
        private manageProductServices: ManageProductServices
    ) { }

    @Effect()
    getAllProducts$ = this.actions$.pipe(
        ofType(ManageProductActionNames.GET_ALL_PRODUCTS),
        switchMap((action: GetAllProductsAction) => {
            const userId = action.payload.userId;
            const pageIndex = action.payload.pageIndex;
            const pageSize = action.payload.pageSize;

            return this.manageProductServices
                .getAllProducts(userId, pageIndex, pageSize)
                .pipe(
                    map(products => {
                        return new ManageProductSuccessAction(ManageProductActionNames.GET_ALL_PRODUCTS, products)
                    }),
                    catchError((err: any) => of(new ManageProductFailedAction(action.type, err)))
                )
        })
    );

    @Effect()
    getProductDetails$ = this.actions$.pipe(
        ofType(ManageProductActionNames.GET_PRODUCT_DETAILS),
        switchMap((action: GetProductDetailsAction) => {
            const productId = action.payload;
            return this.manageProductServices
                .getProductDetails(productId)
                .pipe(
                    map(product => {
                        return new ManageProductSuccessAction(ManageProductActionNames.GET_PRODUCT_DETAILS, product)
                    }),
                    catchError((err: any) => of(new ManageProductFailedAction(action.type, err)))
                )
        })
    );

    @Effect({ dispatch: false })
    goToCreateProductPage$ = this.actions$.pipe(
        ofType(ManageProductActionNames.GO_TO_CREATE_PRODUCT),
        map(() => {
            this.router.navigate(['create-product']);
        })
    );
    
    @Effect({ dispatch: false })
    goToUpdateProductPage$ = this.actions$.pipe(
        ofType(ManageProductActionNames.GO_TO_EDIT_PRODUCT),
        map(() => this.router.navigate(['update-product']))
    );
}