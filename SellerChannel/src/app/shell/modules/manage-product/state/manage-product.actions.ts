import { Action } from '@ngrx/store';

export enum ManageProductActionNames {
    GET_ALL_PRODUCTS = '[MANAGE-PRODUCT] Get all products',
    GET_PRODUCT_DETAILS = '[MANAGE-PRODUCT] Get product details',
    CREATE_PRODUCT = '[MANAGE-PRODUCT] Create new product',
    UPDATE_PRODUCT = '[MANAGE-PRODUCT] Update product',
    DELETE_PRODUCT = '[MANAGE-PRODUCT] Update product',
    GO_TO_CREATE_PRODUCT = '[MANAGE-PRODUCT] Go to create product page',
    GO_TO_EDIT_PRODUCT = '[MANAGE-PRODUCT] Go to edit product page',
    
    ACTION_SUCCESS = '[MANAGE-PRODUCT] Action Success',
    ACTION_FAILED = '[MANAGE-PRODUCT] Action Failed'
}

export interface ManageProductAction extends Action {
    type: ManageProductActionNames;
    payload?: any;
}

export class GetAllProductsAction implements Action {
    type = ManageProductActionNames.GET_ALL_PRODUCTS;
    constructor(public payload: {
        userId: string,
        pageIndex: number,
        pageSize: number
    }) { }
}

export class GetProductDetailsAction implements Action {
    type = ManageProductActionNames.GET_PRODUCT_DETAILS;
    constructor(public payload: string) { }
}

export class CreateProductAction implements Action {
    type = ManageProductActionNames.CREATE_PRODUCT;
    constructor() { }
}

export class UpdateProductAction implements Action {
    type = ManageProductActionNames.UPDATE_PRODUCT;
    constructor(public payload: {
        productId: string,
        productDto: any
    }) { }
}

export class DeleteProductAction implements Action {
    type = ManageProductActionNames.DELETE_PRODUCT;
    constructor(public payload: string) { }
}

export class GoToCreateProduct implements Action {
    type = ManageProductActionNames.GO_TO_CREATE_PRODUCT;
    constructor() { }
}

export class GoToEditProduct implements Action {
    type = ManageProductActionNames.GO_TO_EDIT_PRODUCT;
    constructor() { }
}

//Generic

export class ManageProductSuccessAction implements Action {
    type = ManageProductActionNames.ACTION_SUCCESS;
    constructor(public subType: ManageProductActionNames, public payload: any) { }
}

export class ManageProductFailedAction implements Action {
    type = ManageProductActionNames.ACTION_FAILED;
    constructor(public subType: ManageProductActionNames, public payload: any) { }
}