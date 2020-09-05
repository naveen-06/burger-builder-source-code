import React from 'react';

import styles from './Ingredient.module.css';

const Ingredient = ( { type } ) => {
  let ingredient = null;
  switch (type) {
    case "bread-top":
      ingredient = (
        <div className={styles.BreadTop}>
          <div className={styles.Seeds1}/>
          <div className={styles.Seeds2}/>
        </div>
      );
      break;
    case "bread-bottom":
      ingredient = <div className={styles.BreadBottom}/>;
      break;
    case "salad":
      ingredient = <div className={styles.Salad}/>;
      break;
    case "cheese":
      ingredient = <div className={styles.Cheese}/>;
      break;
    case "bacon":
      ingredient = <div className={styles.Bacon}/>;
      break;
    case "meat":
      ingredient = <div className={styles.Meat}/>;
      break;
    default:
      return ingredient;
  }

  return ingredient;
};

export default Ingredient;