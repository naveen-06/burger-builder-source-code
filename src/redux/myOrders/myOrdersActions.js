import axios from 'axios';
import * as actionType from './myOrdersActionType';

export const fetchOrdersStart = () => ({
  type: actionType.FETCH_ORDERS_START
});

export const fetchOrdersSuccess = orders => ({
  type: actionType.FETCH_ORDERS_SUCCESS,
  payload: orders
});

export const fetchOrdersFailure = error => ({
  type: actionType.FETCH_ORDERS_FAILURE,
  payload: error
});

export const fetchOrders = ( currentUser ) => {
  return dispatch => {
    if (currentUser) {
    dispatch( fetchOrdersStart() );
    axios.get("https://my-burger-8b19a.firebaseio.com/orders.json")
    .then( ({ data }) => {
      const fetchedOrders = [];
      for (let key in data) {
        fetchedOrders.push({
          id: key,
          details: data[key].details,
          ingredients: data[key].ingredients,
          totalPrice: data[key].totalPrice,
          time: data[key].time,
          userId: data[key].userId
        })
      }
      const currentUserOrder = fetchedOrders.filter( order => order.userId === currentUser.uid );
      dispatch( fetchOrdersSuccess( currentUserOrder ) )
    } )
    .catch(error => dispatch( fetchOrdersFailure(error) ));
    }
  };
};

export const deleteOrderStart = () => ({
  type: actionType.DELETE_ORDER_START
});

export const deleteOrderSuccess = orderId => ({
  type: actionType.DELETE_ORDER_SUCCESS,
  payload: orderId
});

export const deleteOrderFailure = error => ({
  type: actionType.DELETE_ORDER_FAILURE,
  payload: error
});

export const deleteOrder = orderId => {
  return dispatch => {
    dispatch( deleteOrderStart() );
    axios.delete(`https://my-burger-8b19a.firebaseio.com/orders/${orderId}.json`)
      .then( () => dispatch( deleteOrderSuccess(orderId) ))
      .catch( error => dispatch( deleteOrderFailure(error) ))
  };
};