import React from 'react';

import styles from './Burger.module.css';
import Ingredients from '../Ingredients/Ingredients';

const Burger = () => (
  <div className={styles.Burger}>
    <Ingredients />
  </div>
);

export default Burger;