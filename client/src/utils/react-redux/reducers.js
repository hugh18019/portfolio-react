import {
    UPDATE_PRODUCTS,
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    CLEAR_CART,
    UPDATE_CART_QUANTITY,
    TOGGLE_CART,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    UPDATE_CURRENT_PRODUCT
} from './actions';

var initState = {
    products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: '',
    currentProduct: '',
  };

const reducers = (state=initState, action) => {

    switch (action.type) {
    case 'UPDATE_PRODUCTS': {
        return {
            ...state,
            products: [...action.products]
        }
    }
    case 'ADD_TO_CART': {
        return {
            ...state,
            cartOpen: true,
            cart: [...state.cart, action.product],
        }
    }
    case 'ADD_MULTIPLE_TO_CART': {
        return {
            ...state,
            cart: [...state.cart, action.products]
        }
    }
    case 'REMOVE_FROM_CART': { 
        let newState = state.cart.filter((product) => {
            return product.id != action.product.id
        })

        return {
            ...state,
            cartOpen: newState.length > 0,
            cart: newState
        }
    }
    case 'CLEAR_CART': {
        return {
            ...state,
            cart: []
        }
    }
    case 'TOGGLE_CART': {

        return {
            ...state,
            cartOpen: !state.cartOpen
        }
    }

    default: {
        return state;
    }
    }
}

export default reducers;