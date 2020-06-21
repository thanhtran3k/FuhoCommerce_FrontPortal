import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { IManageProductState } from './manage-product.state';
import { Injectable } from '@angular/core';
import { BaseSelector } from 'src/app/shared/model/base.selector';
import { Observable } from 'rxjs';
import { ManageProduct } from 'src/app/shared/model/manage-product/manage-product.model';
import { Actions } from '@ngrx/effects';
import { ManageProductActionNames } from './manage-product.actions';

export const getManageProductState = createFeatureSelector<IManageProductState>(
    'ManageProductModule'
);

const getManageProduct = createSelector(
    getManageProductState,
    (state: IManageProductState) => state.ManagedProducts
);

@Injectable()
export class ArticleSelectors extends BaseSelector {
    public manageProduct$: Observable<ManageProduct[]>;

    constructor(private store: Store<any>, private articleActions: Actions) {
        super(articleActions, ManageProductActionNames.ACTION_SUCCESS, ManageProductActionNames.ACTION_FAILED);
        
        this.manageProduct$ = this.store.select(getManageProduct);
    }
}