import React, { Component } from 'react';

import styles from './Signin.module.css';

import FormInput from '../../../components/customComponents/FormInput/FormInput';
import Button from '../../../components/customComponents/Button/Button';
import SigninAndSignup from '../../Authentication/SinginAndSignup/SigninAndSignup';
import { ReactComponent as GoogleIcon } from '../../../assets/google.svg';

import { auth, signInWithGoogle } from '../../../firebase.utils/firebase.utils';

class Signin extends Component {
  state = {
    email: "",
    password: "",
    error: "",
    loading: false
  }

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  }

  handleSubmit = async evt => {
    evt.preventDefault();
    const { email, password } = this.state;

    if (email.trim() === '') {
      this.setState({ error: "*enter a valid email address"});
      return;
    }

    if (password.trim() === '') {
      this.setState({ error: "*please enter correct password"});
      return;
    }

    this.setState({loading: true, error: ''});
    try {
      await auth.signInWithEmailAndPassword( email, password );
      this.setState({
        email: "",
        password: "",
        error: "",
        loading: false
      });
      this.props.history.replace("/");
    } catch (error) {
      this.setState({error: "*check your email & password", loading: false})
    }
  }

  handleGoogleSignin = async () => {
    try {
      await signInWithGoogle();
      this.setState({error: ""});
      this.props.history.replace("/");
    } catch (error) {
      this.setState({error: "*try again later"});
    }
  }

  render() {
    const { email, password, error, loading } = this.state;

    return (
      <div className={styles.Container}>
        <form onSubmit={this.handleSubmit} className={styles.Signin}>
          <h4>Welcome back!</h4>
          <FormInput 
            type="email" 
            name="email" 
            label="Email" 
            change={this.handleChange} 
            value={email} />
          <FormInput 
            type="password" 
            name="password" 
            label="Password" 
            change={this.handleChange} 
            value={password} />
          { error && <p className={styles.ErrorMsg}>{error}</p> }
          <Button primary>
            { loading ? "Logging in..." : "Log in" }
          </Button>
          <Button type="type" click={() => this.handleGoogleSignin()}>
            <p className={styles.GoogleSigninBtn}>
              <span className={styles.GoogleIcon}>
                <GoogleIcon />
              </span>
              <span>
                continue with google
              </span>
            </p>
          </Button>
        </form>
        <SigninAndSignup message="Don't have an account? " path="signup"/>
      </div>
    );
  }
}

export default Signin;