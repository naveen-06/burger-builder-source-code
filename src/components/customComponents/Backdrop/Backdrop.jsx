import React from 'react';

import styles from './Backdrop.module.css';

const Backdrop = ({ show, click }) => (
  show && <div className={styles.Backdrop} onClick={click}/>
);

export default Backdrop;