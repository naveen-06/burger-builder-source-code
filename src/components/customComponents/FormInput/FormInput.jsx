import React from 'react';

import styles from './FormInput.module.css';

const FormInput = ({ change, label, ...otherProps }) => (
  <div className={styles.FormInput}>
    <input onChange={change} {...otherProps}/>
    <p className={`${styles.Label} ${otherProps.value && styles.Shrink}`}>
      {label}
    </p>
  </div>
);

export default FormInput;