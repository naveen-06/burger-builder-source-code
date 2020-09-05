import { createSelector } from 'reselect';

const selectBurgerBuilder = state => state.burgerBuilder;

export const selectBurgerIngredients = createSelector(
  [selectBurgerBuilder],
  burgerBuilder => burgerBuilder.ingredients
);

export const selectBurgerTotalPrice = createSelector(
  [selectBurgerBuilder],
  burgerBuilder => burgerBuilder.totalPrice
);