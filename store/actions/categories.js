import * as actionTypes from './actionTypes';
import firebase from '../../utils/Firebase';

export const setCategoriesData = (categories) => {
    return {
        type: actionTypes.SET_CATEGORIES_DATA,
        categories: categories,
    };
};

export const initCategoriesData = () => {
    return dispatch => {
        firebase.getCategories()
            .then(result => dispatch(setCategoriesData(result)))
            .catch(e => console.log(e));
    }
};

export const setCategoryItemsData = (categoryItems) => {
    return {
        type: actionTypes.SET_CATEGORY_ITEM_DATA,
        categoryItems: categoryItems,
    }
};

export const initCategoryItemsData = (categoryId) => {
    return dispatch => {
        firebase.getCategoryItems(categoryId)
            .then( result => dispatch(setCategoryItemsData(result)))
            .catch( e => console.log(e));
    }
};