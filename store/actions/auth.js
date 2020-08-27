import * as actionTypes from './actionTypes';
import firebase from '../../utils/Firebase';

export const signIn = (name) => {
    return {
        type: actionTypes.SIGN_IN,
        name: name,
    };
};

export const onSignOut = () => {
    return {
        type: actionTypes.SIGN_OUT,
    };
};

export const signOut = () => {
    return dispatch => {
        firebase.signOut().then( result => {
            dispatch(onSignOut())
        })
        .catch( error => console.log(error));
    }
}; 