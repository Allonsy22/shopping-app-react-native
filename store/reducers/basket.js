import { updateObject } from '../utility';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    store: [],
    count: 0,
    loading: false,
    alert: false,
};

const setUserBasket = (state, action) => {
    const items = action.items;
    const count = getItemsCount(items);
    return updateObject(state, {
        store: items,
        count: count,
    });
};

const addItem = (state, action) => {
    const { id, count } = action.item;
    const index = state.store.findIndex(item => item.id === id);

    if (index > -1) return addAnotherOneItem(state, index, count);
    const item = action.item;
    return updateObject(state, {
        count: state.count + count,
        store: [...state.store, {
          id: item.id,
          count: item.count,
          name: item.name,
          description: item.description,
          gender: item.gender,
          images: item.images,
          price: item.price,
          productDetails: item.productDetails,
          rating: item.rating
        }],
    });
};

const removeItem = (state, action) => {
    const { count, id } = action.props;
    if ( count === 1 ) return state;

    const store = [...state.store];
    const index = store.findIndex(item => item.id === id);
    store[index].count -= 1;
    return updateObject(state, {
        count: state.count - 1,
        store: [...store],
    });
};

const deleteItem = (state, action) => {
    const { id, count } = action.props;
    const store = state.store.filter( (item) => item.id !== id );
    return updateObject(state, {
        count: state.count - count,
        store: [...store],
    });
};

const toggleAlert = (state, action) => {
  return updateObject(state, {
    alert: !state.alert,
  });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER_BASKET: return setUserBasket(state, action);
        case actionTypes.ADD_ITEM: return addItem(state, action);
        case actionTypes.REMOVE_ITEM: return removeItem(state, action);
        case actionTypes.DELETE_ITEM: return deleteItem(state, action);
        case actionTypes.TOGGLE_ALERT: return toggleAlert(state, action);
        default: return state;
    }
};

export default reducer;

// utils function

function addAnotherOneItem(state, index, count) {
    const store = [...state.store];
    store[index].count += count;
    return updateObject(state, {
        count: state.count + count,
        store: [...store],
    });
};

function getItemsCount(items) {
    return items.reduce( (accum, current) => {
        return accum + current.count;
    }, 0);
};