import React, { Component, lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import styles from './App.module.css';

import Header from './containers/Header/Header';
import Navbar from './containers/Navbar/Navbar';
import Spinner from './components/customComponents/Spinner/Spinner';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
// import PageNotFound from './components/customComponents/PageNotFound/PageNotFound';

import { auth } from './firebase.utils/firebase.utils';

const BurgerBuilder = lazy( () => import('./containers/BurgerBuilder/BurgerBuilder') );
const OrderSummary = lazy( () => import('./components/OrderSummary/OrderSummary') );
const Checkout = lazy( () => import('./components/Checkout/Checkout') );
const MyOrders = lazy( () => import('./containers/MyOrders/MyOrders') );
const Signin = lazy( () => import('./containers/Authentication/Signin/Signin') );
const Signup = lazy( () => import('./containers/Authentication/Signup/Signup') );

class App extends Component {
  state = {
    currentUser: null
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div className={styles.App}>
        <Header currentUser={currentUser}/>
        <Navbar currentUser={currentUser}/>
        <main>
          <ErrorBoundary>
            <Suspense fallback={<Spinner />}>
              <Switch>
                <Route path="/" exact render={() => <BurgerBuilder currentUser={currentUser}/>}/>
                <Route path="/signin" component={Signin}/>
                <Route path="/signup" component={Signup}/>
                <Route path="/summary" component={OrderSummary}/>
                <Route path="/checkout" render={routeProps => <Checkout currentUser={currentUser} {...routeProps}/>}/>
                <Route path="/orders" render={() => <MyOrders currentUser={currentUser}/>}/>
                {/* <Route path="**" component={PageNotFound}/> */}
                <Redirect to="/"/>
              </Switch>
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>
    );
  }
}

export default App;