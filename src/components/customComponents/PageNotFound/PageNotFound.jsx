import React from 'react';

import styles from './PageNotFound.module.css';
import Button from '../Button/Button';

const PageNotFound = ({ history }) => (
  <div className={styles.PageNotFound}>
    <h2>Oops! we are sorry</h2>
    <h4>page not found</h4>
    <Button primary click={() => history.replace("/")}>go to home</Button>
  </div>
);

export default PageNotFound;