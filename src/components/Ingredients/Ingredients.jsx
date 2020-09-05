import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import styles from './Ingredients.module.css';
import Ingredient from '../Ingredient/Ingredient';

import { selectBurgerIngredients } from '../../redux/burgerBuilder/burgerBuilderSelector';

const Ingredients = ({ ingredients }) => {
  
  let ingredientsToMap = null;
  if (ingredients) {
    ingredientsToMap = Object.keys(ingredients)
      .map( ingredientKeys => [ ...Array(ingredients[ingredientKeys]) ]
      .map( (_, idx) => <Ingredient key={ingredientKeys + idx} type={ingredientKeys}/> )
    );
  }

  const sum = [];
  for (let key in ingredients) {
    sum.push(ingredients[key])
  }
  const check = sum.reduce( (preValue, curValue) => preValue + curValue > 0, 0 )

  return (
    <div className={styles.Ingredients}>
      <Ingredient type="bread-top"/>
      { 
        check 
          ? ingredientsToMap 
          : <p className={styles.Create}>add ingredients</p> 
      }
      <Ingredient type="bread-bottom"/>
    </div>
  )
};

const mapStateToProps = createStructuredSelector({
  ingredients: selectBurgerIngredients
});

export default connect(mapStateToProps)(Ingredients);