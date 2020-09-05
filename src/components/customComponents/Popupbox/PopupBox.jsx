import React from 'react';

import styles from './PopupBox.module.css';

const PopupBox = ({ show, children }) => (
  show && 
  <div className={styles.PopupBox}>
    {children}
  </div>
);

export default PopupBox;