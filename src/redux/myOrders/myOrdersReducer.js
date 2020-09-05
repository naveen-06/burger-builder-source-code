import * as actionType from './myOrdersActionType';

const INITIAL_STATE = {
  orders: [],
  loading: false,
  error: null
};

const myOrderReducer = ( state = INITIAL_STATE, action ) => {
  switch (action.type) {
    case actionType.FETCH_ORDERS_START:
      return {
        ...state,
        loading: true,
        error: null
      }
    case actionType.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        loading: false
      }
    case actionType.FETCH_ORDERS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    case actionType.DELETE_ORDER_START:
      return {
        ...state,
        loading: true
      }
    case actionType.DELETE_ORDER_SUCCESS:
      return {
        ...state,
        orders: state.orders.filter( order => order.id !== action.payload ),
        loading: true
      }
    case actionType.DELETE_ORDER_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: true
      }
    default:
      return state;
  }
};

export default myOrderReducer;