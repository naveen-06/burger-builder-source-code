import { combineReducers } from 'redux';

import burgerBuilderReducer from '../burgerBuilder/burgerBuilderReducer';
import myOrdersReducer from '../myOrders/myOrdersReducer';
import userReducer from '../user/userReducer';

export const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  myOrders: myOrdersReducer,
  user: userReducer
});