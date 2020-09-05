import React, { Component } from 'react';

import styles from './BurgerBuilder.module.css';

import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/BurgerControls/BurgerControls';

class BurgerBuilder extends Component {
  render() {
    return (
      <div className={styles.BurgerBuilder}>
        <Burger />
        <BurgerControls currentUser={this.props.currentUser}/>
      </div>
    );
  }
}

export default BurgerBuilder;