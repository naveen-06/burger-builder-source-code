import React from 'react';

import styles from './Button.module.css';

const Button = ({ children, click, disable, primary }) => (
  <button className={`${styles.Button} ${primary && styles.PrimaryBtn}`} onClick={click} disabled={disable}>
    {children}
  </button>
);

export default Button;