import * as actionTypes from './actionTypes';
import firebase from '../../utils/Firebase';

export const setUserBasket = (items) => {
    return {
        type: actionTypes.SET_USER_BASKET,
        items: items,
    }
};

export const addItem = ( props ) => {
    return {
        type: actionTypes.ADD_ITEM,
        item: {...props, ...props.props}
    };
};

export const removeItem = (props) => {
    return {
        type: actionTypes.REMOVE_ITEM,
        props: props,
    };
};

export const deleteItem = (props) => {
    return {
        type: actionTypes.DELETE_ITEM,
        props: props,
    };
};

export const initUserBasket = () => {
    return dispatch => {
        firebase.getUserBasket()
            .then( result => {
                dispatch(setUserBasket(result));
            })
            .catch( error => {
                console.log(error);
                dispatch(setUserBasket(new Array()));
            });
    };
};

export const toggleAlert = () => {
    return {
        type: actionTypes.TOGGLE_ALERT
    };
};
