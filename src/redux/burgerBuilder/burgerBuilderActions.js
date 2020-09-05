import * as actionType from './burgerBuilderActionTypes';

export const addIngredientToBurger = ingredientType => ({
  type: actionType.ADD_INGREDIENT,
  payload: ingredientType
});

export const removeIngredientFromBurger = ingredientType => ({
  type: actionType.REMOVE_INGREDENT,
  payload: ingredientType
});