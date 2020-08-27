import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import categoriesReducer from './reducers/categories';
import basketReducer from './reducers/basket';
import authReducer from './reducers/auth';

const rootReducer = combineReducers({
    categories: categoriesReducer,
    basket: basketReducer,
    auth: authReducer,
});

export default store = createStore(rootReducer, applyMiddleware(thunk));