import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import styles from './Header.module.css';
import Button from '../../components/customComponents/Button/Button';
import { ReactComponent as BurgerIcon } from '../../assets/burger.svg';
import { auth } from '../../firebase.utils/firebase.utils';

class Header extends Component {
  signOut = () => {
    auth.signOut();
    this.props.history.push('/');
  }

  render() {
    const { history, currentUser } = this.props;

    return (
      <header className={styles.Header}>
        <div className={styles.TitleAndIcon}>
          <div className={styles.BurgerIcon}>
            <BurgerIcon />
          </div>
          <h2 className={styles.Title} onClick={() => history.push("/")}>Burger Builder</h2>
        </div>
        <div className={styles.Buttons}>
          { currentUser 
            ? <Button click={this.signOut}>Logout</Button>
            : <div className={styles.Buttons}>
              <Button click={() => history.push("/signin")}>Log in</Button>
              <Button primary click={() => history.push("/signup")}>Sign up</Button>
            </div> }
        </div>
      </header>
    );
  }
}

export default withRouter(Header);