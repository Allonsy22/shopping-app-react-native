import { updateObject } from '../utility';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    categories: [],
    categoryItems: [],
};

const setCategoriesData = (state, action) => {
    return updateObject(state, {
        categories: action.categories,
    });
};

const setCategoryItemData = (state, action) => {
    return updateObject(state, {
        categoryItems: action.categoryItems,
    });
};

const reducer = ( state = initialState, action ) => {
    switch( action.type ) {
        case actionTypes.SET_CATEGORIES_DATA: return setCategoriesData(state, action);
        case actionTypes.SET_CATEGORY_ITEM_DATA: return setCategoryItemData(state, action);
        default: return state;
    }
};

export default reducer;