import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import styles from './OrderSummary.module.css';
import Burger from '../Burger/Burger';
import Button from '../customComponents/Button/Button';

import { selectBurgerIngredients, selectBurgerTotalPrice } from '../../redux/burgerBuilder/burgerBuilderSelector';

const OrderSummary = ({ ingredients, totalPrice, history }) => {
  const ingredientsDetails = [];
  for (let key in ingredients) {
    ingredientsDetails.push({
      name: key,
      count: ingredients[key]
    });
  }
  
  return (
    <div className={styles.OrderSummary}>
      <Burger />
      <div className={styles.Info}>
        <h4 className={styles.Title}>Your Order Summary</h4>
        <div className={styles.Ingredients}>
          {ingredientsDetails.map( ({ name, count }) => (
            <p className={styles.Ingredient} key={name}>{name} - {count}</p>
          ))}
        </div>
        <h2 className={styles.Price}>Total Price: $ {totalPrice.toFixed(2)}</h2>
        <div className={styles.Buttons}>
          <Button primary click={() => history.push("/checkout")}>continue</Button>
          <Button click={() => history.goBack()}>back</Button>
        </div>
      </div>
    </div>
    );
};

const mapStateToProps = createStructuredSelector({
  ingredients: selectBurgerIngredients,
  totalPrice: selectBurgerTotalPrice
});

export default connect(mapStateToProps)(OrderSummary);