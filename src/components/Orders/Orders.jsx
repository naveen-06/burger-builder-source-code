import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import styles from './Orders.module.css';


import Popupbox from '../customComponents/Popupbox/PopupBox';
import Backdrop from '../customComponents/Backdrop/Backdrop';
import Button from '../customComponents/Button/Button';

import { ReactComponent as BurgerLogo } from '../../assets/burger.svg';
import { deleteOrder } from '../../redux/myOrders/myOrdersActions';
import { selectLoading } from '../../redux/myOrders/myOrdersSelector';

class Orders extends Component {
  state = {
    showPopup: false
  }

  togglePopup = () => {
    this.setState(state => ({
      showPopup: !state.showPopup
    }));
  }

  render() {
    const { showPopup } = this.state;
    const { id, time, totalPrice, ingredients, deleteOrder } = this.props;

    let ingredientsCount = [];
    for (let key in ingredients) {
      ingredientsCount.push({ name: key, count: ingredients[key]})
    }

    return (
      <div>
        <Backdrop show={showPopup} click={() => this.togglePopup()}/>
        <Popupbox show={showPopup}>
          <p className={styles.Confirm}>Are you sure to delete?</p>
          <div>
            <Button primary click={() => deleteOrder(id)}>yes</Button>
            <Button click={() => this.togglePopup()}>cancel</Button>
          </div>
        </Popupbox>
        <div key={id} className={styles.Order}>
          <div className={styles.Burger}>
            <BurgerLogo />
          </div>
          <div className={styles.Content}>
            <p>Ordered on: { new Date(time).toDateString()}</p>
            <h4>Price: $ {totalPrice}</h4>
            {ingredientsCount.map( ({ name, count }) => (
              <span key={name} className={styles.Count}>{name} - {count}</span>
            ))}
          </div>
          <div className={styles.Delete} onClick={() => this.togglePopup() }>&#10005;</div>
        </div>
      </div>
    )
  };
}

const mapStateToProps = createStructuredSelector({
  loading: selectLoading
});

const mapDispatchToProps = dispatch => ({
  deleteOrder: order => dispatch( deleteOrder(order) )
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);