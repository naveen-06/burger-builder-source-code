import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import styles from './MyOrders.module.css';
import Order from '../../components/Orders/Orders';

import { selectOrders, selectLoading, selectError, selectOrdersQuantity } from '../../redux/myOrders/myOrdersSelector';
import { fetchOrders } from '../../redux/myOrders/myOrdersActions';

class MyOrders extends PureComponent {
  componentDidMount() {
    const { currentUser, fetchOrders } = this.props;
    if (currentUser) fetchOrders( currentUser );
  }

  render() {
    const { orders, quantity } = this.props;

    return (
      <div className={styles.MyOrders}>
        <h3 className={styles.Title}>Previous Orders</h3>
        <p className={styles.Title}>Total number of orders: {quantity}</p>
        { orders.length <= 0 ? <p className={styles.NoOrder}>no orders</p> : orders.map( order => <Order key={order.id} {...order}/> ) }
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  orders: selectOrders,
  loading: selectLoading,
  error: selectError,
  quantity: selectOrdersQuantity
});

const mapDispatchToProps = dispatch => ({
  fetchOrders: user => dispatch( fetchOrders( user ) )
});

export default connect(mapStateToProps, mapDispatchToProps)(MyOrders);