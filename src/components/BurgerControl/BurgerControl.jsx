import React from 'react';
import { connect } from 'react-redux';

import styles from './BurgerControl.module.css';
import Button from '../customComponents/Button/Button';
import { addIngredientToBurger, removeIngredientFromBurger } from '../../redux/burgerBuilder/burgerBuilderActions';

const controls = [
  { type: "salad", price: 0.6 },
  { type: "cheese", price: 0.4 },
  { type: "bacon", price: 1 },
  { type: "meat", price: 1.6 }
];

const BurgerControl = ({ ingredients, addIngredient, removeIngredient }) => {
  const control = controls.map( ({ type, price }) => (
    <div key={type} className={styles.BurgerControl}>
      <span className={styles.Label}>{type}</span>
      <span className={styles.Price}>$ {price}</span>
      <Button 
        primary
        click={() => addIngredient(type)}>add</Button>
      <Button
        disable={ingredients[type] <= 0}
        click={() => removeIngredient(type)}>remove</Button>
    </div>
  ) );

  return (
    <div className={styles.ControlContainer}>
      {control}
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  addIngredient: ingredientType => dispatch( addIngredientToBurger(ingredientType) ),
  removeIngredient: ingredientType => dispatch( removeIngredientFromBurger(ingredientType) )
});

export default connect(null, mapDispatchToProps)(BurgerControl);