import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import styles from './BurgerControls.module.css';
import BurgerControl from '../BurgerControl/BurgerControl';

import { selectBurgerIngredients, selectBurgerTotalPrice } from '../../redux/burgerBuilder/burgerBuilderSelector';

const BurgerControls = ({ ingredients, totalPrice, currentUser, history }) => {
  const sum = [];
  for (let key in ingredients) {
    sum.push(ingredients[key])
  }
  const check = sum.reduce( (preValue, curValue) => preValue + curValue > 0, 0 )

  return (
    <div className={styles.BurgerControls}>
      <h3>Add Ingredients</h3>
      <BurgerControl ingredients={ingredients}/>
      <h4>Total Price: $ {totalPrice.toFixed(2)}</h4>
      { 
      currentUser ? <button 
        className={`${styles.OrderBtn} ${!check && styles.Disabled}`} 
        disabled={!check} onClick={() => history.push("/summary")}>
          order now
      </button> 
      : <button 
          className={`${styles.OrderBtn} ${!check && styles.Disabled}`}
          onClick={() => history.push("/signin")}>
            sign in to order
        </button> 
      }
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  ingredients: selectBurgerIngredients,
  totalPrice: selectBurgerTotalPrice,
});

export default withRouter(connect(mapStateToProps)(BurgerControls));