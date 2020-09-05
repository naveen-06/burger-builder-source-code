import { createSelector } from 'reselect';

const selectMyOrders = state => state.myOrders;

export const selectOrders = createSelector(
  [selectMyOrders],
  myOrders => myOrders.orders
);

export const selectLoading = createSelector(
  [selectMyOrders],
  myOrders => myOrders.loading
);

export const selectError = createSelector(
  [selectMyOrders],
  myOrders => myOrders.error
);

export const selectOrdersQuantity = createSelector(
  [selectOrders],
  orders => orders.length
);