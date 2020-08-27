import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    isSignedIn: false,
    name: "Guest",
};

const signIn = (state, action) => {
    return updateObject(state, {
        isSignedIn: true,
        name: action.name,
    });
};

const signOut = (state, action) => {
    return updateObject(state, {
        isSignedIn: false,
        name: "Guest",
    });
};

const reducer = (state = initialState, action) => {
    switch( action.type ) {
        case actionTypes.SIGN_IN: return signIn(state, action);
        case actionTypes.SIGN_OUT: return signOut(state, action);
        default: return state;
    };
};

export default reducer;