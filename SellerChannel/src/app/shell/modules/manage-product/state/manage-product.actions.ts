import { Action } from '@ngrx/store';

export enum ManageProductActionNames {
    GET_ALL_PRODUCTS = '[MANAGE-PRODUCT] Get all products',
    
    ACTION_SUCCESS = '[MANAGE-PRODUCT] Action Success',
    ACTION_FAILED = '[MANAGE-PRODUCT] Action Failed'
}

export interface ManageProductAction extends Action {
    type: ManageProductActionNames;
    payload?: any;
}

export class GetAllProductsAction implements Action {
    type = ManageProductActionNames.GET_ALL_PRODUCTS;
    constructor(public payload: string) { }
}

export class ManageProductSuccessAction implements Action {
    type = ManageProductActionNames.ACTION_SUCCESS;
    constructor(public subType: ManageProductActionNames, public payload: any) { }
}

export class ManageProductFailedAction implements Action {
    type = ManageProductActionNames.ACTION_FAILED;
    constructor(public subType: ManageProductActionNames, public payload: any) { }
}