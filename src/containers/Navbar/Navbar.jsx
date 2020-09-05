import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Navbar.module.css';

// import { ReactComponent as BurgerIcon } from '../../assets/new-burger.svg';
// import { ReactComponent as ListIcon } from '../../assets/list-icon.svg';

const Navbar = ({ currentUser }) => (
  <nav className={styles.Navbar}>
    <NavLink activeClassName={styles.active} to="/" exact>
      New burger
    </NavLink>
    { currentUser && 
      <NavLink activeClassName={styles.active} to="/orders" >
        My orders
      </NavLink> }
  </nav>
);

export default Navbar;