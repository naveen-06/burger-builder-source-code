import * as actionType from './burgerBuilderActionTypes';

const INGREDIENT_PRICE = {
  salad: 0.6,
  bacon: 1,
  cheese: 0.4,
  meat: 1.6
};

const INITIAL_STATE = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  totalPrice: 5
};

const burgerBuilderReducer = ( state = INITIAL_STATE, action ) => {
  switch (action.type) {
    case actionType.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: { 
          ...state.ingredients,
          [action.payload]: state.ingredients[action.payload] + 1 
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.payload]
      }
    case actionType.REMOVE_INGREDENT:
      return {
        ...state,
        ingredients: { 
          ...state.ingredients,
          [action.payload]: state.ingredients[action.payload] - 1 
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICE[action.payload]
      }
    default:
      return state;
  }
};

export default burgerBuilderReducer;