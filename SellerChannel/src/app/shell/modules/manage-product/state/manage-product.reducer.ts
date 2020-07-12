import { IManageProductState } from './manage-product.state';
import { ManageProductAction, ManageProductActionNames, ManageProductFailedAction, ManageProductSuccessAction } from './manage-product.actions';
import { ManageProduct } from 'src/app/shared/model/manage-product/manage-product.model';

export const initialManageProductState: IManageProductState = {
    ManagedProducts: []
};

export function manageProductReducer(
    manageProductState: IManageProductState = initialManageProductState,
    action: ManageProductAction
): IManageProductState {
    switch (action.type) {
        case ManageProductActionNames.ACTION_SUCCESS:
            return actionSuccessReducer(
                manageProductState,
                action as ManageProductSuccessAction
            );
        case ManageProductActionNames.ACTION_FAILED:
            return actionFailReducer(
                manageProductState,
                action as ManageProductFailedAction
            )
        default:
            return manageProductState;
    };
}

function actionSuccessReducer(
    manageProductState: IManageProductState,
    action: ManageProductSuccessAction
): IManageProductState {
    switch (action.type) {
        case ManageProductActionNames.GET_ALL_PRODUCTS:
            const manageProductList = action.payload as ManageProduct[];
            // equivalent to Object.assign({}, payload);
            return {
                ...manageProductState,
                ManagedProducts: manageProductList
            };
        default:
            return manageProductState;
    }
}

function actionFailReducer(
    manageProductState: IManageProductState,
    action: ManageProductFailedAction
): IManageProductState {
    switch (action.subType) {
        default:
            return manageProductState;
    }
}