import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import axios from 'axios';

import styles from './Checkout.module.css';
import FormInput from '../customComponents/FormInput/FormInput';
import Button from '../customComponents/Button/Button';
import PopupBox from '../customComponents/Popupbox/PopupBox';
import Backdrop from '../customComponents/Backdrop/Backdrop';

import { ReactComponent as ErrorIcon } from '../../assets/error.svg';
import { ReactComponent as SuccessIcon } from '../../assets/checked.svg';
import { selectBurgerIngredients, selectBurgerTotalPrice } from '../../redux/burgerBuilder/burgerBuilderSelector';

class Checkout extends Component {
  state = {
    name: "",
    address: "",
    phone: "",
    code: "",
    show: false,
    error: '',
    loading: false,
  }

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  }

  handleSubmit = evt => {
    evt.preventDefault();
    const { ingredients, totalPrice, currentUser } = this.props;
    const { name, address, phone, code } = this.state;

    if (name.trim() === '') {
      this.setState({ error: "*enter your name" });
      return;
    }

    if (address.trim() === '') {
      this.setState({ error: "*correct address to reach you" });
      return;
    }

    if (phone.length < 10) {
      this.setState({ error: "*enter a valid phone number" });
      return;
    }

    if (code.length < 6) {
      this.setState({ error: "*enter 6 digit pin code" });
      return;
    }

    const orderDetails = {
      ingredients: ingredients,
      totalPrice: totalPrice,
      time: new Date(),
      details: {
        name,
        address,
        phone,
        code
      },
      userId: currentUser.uid
    };

    this.setState({loading: true, error: ''})
    axios.post("https://my-burger-8b19a.firebaseio.com/orders.json", orderDetails)
      .then( () => {
        this.setState(state => ({
          show: !state.show,
          loading: false,
          name: "",
          address: "",
          phone: "",
          code: "",
          error: false
        }))
      })
      .catch(() => {
        this.setState( state => ({ 
          loading: false, 
          error: '*Oops! order failed',
          show: !state.show
        }));
      }) 
  }

  togglePopup = () => {
    this.setState(state => ({
      show: !state.show
    }));
  }

  render() {
    const { history } = this.props;
    const { name, address, phone, code, show, loading, error } = this.state;

    return (
      <div className={styles.CheckoutContainer}>
        <Backdrop show={show} click={this.togglePopup}/>
        <PopupBox show={show}>
          <p className={styles.ErrorMsg}>
            { error ? "Failed to place order" : "Order placed successfully!" }
          </p>
          <div className={styles.CheckedIcon}>
            { error ? <ErrorIcon /> : <SuccessIcon /> }
          </div>
          <Button primary click={this.togglePopup}>okay</Button>
        </PopupBox>
        <form className={styles.Checkout} onSubmit={this.handleSubmit}>
          <h3>Contact Details</h3>
          <FormInput type="text" name="name" value={name} change={this.handleChange} label="Name"/>
          <FormInput type="text" name="address" value={address} change={this.handleChange} label="Address"/>
          <FormInput type="tel" name="phone" value={phone} change={this.handleChange} label="Phone"/>
          <FormInput type="tel" name="code" value={code} change={this.handleChange} label="Zip code"/>
          <p className={styles.ErrorMsg}>
            { error && error }
          </p>
          {!loading ? <div className={styles.Buttons}>
            <Button type="submit" primary>submit</Button>
            <Button click={() => history.goBack()}>back</Button>
          </div> : <p className={styles.Message}>Placing your order...</p> }
        </form>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  ingredients: selectBurgerIngredients,
  totalPrice: selectBurgerTotalPrice
});

export default connect(mapStateToProps)(Checkout);