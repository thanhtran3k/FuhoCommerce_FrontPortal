import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ManageProductActionNames, GetAllProductsAction, ManageProductSuccessAction, ManageProductFailedAction } from './manage-product.actions';
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
            const userId = action.payload;
            return this.manageProductServices
                .getAllProducts(userId)
                .pipe(
                    map(products => {
                        return new ManageProductSuccessAction(ManageProductActionNames.GET_ALL_PRODUCTS, products)
                    }),
                    catchError((err: any) => of(new ManageProductFailedAction(action.type, err)))
                )
        })
    );
}