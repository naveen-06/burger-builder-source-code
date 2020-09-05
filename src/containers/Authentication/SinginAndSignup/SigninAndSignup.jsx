import React from 'react';
import { Link } from 'react-router-dom';

import styles from './SigninAndSignup.module.css';

const SigninAndSignup = ({ message, path }) => (
  <div className={styles.SigninAndSignup}>
    <span>
      {message} 
      <Link to={`/${path}`}>{path}</Link>
    </span>
  </div>
);

export default SigninAndSignup;