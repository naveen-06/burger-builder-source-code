import React, { Component } from 'react';

import styles from './Signup.module.css';
import FormInput from '../../../components/customComponents/FormInput/FormInput';
import Button from '../../../components/customComponents/Button/Button';
import SigninAndSignup from '../SinginAndSignup/SigninAndSignup';
import { auth } from '../../../firebase.utils/firebase.utils';

class Signup extends Component {
  state = {
    email: "",
    password: "",
    confirmPassword: "",
    error: "",
    loading: false
  }
  
  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  }
  
  handleSubmit = async evt => {
    evt.preventDefault();
    const { email, password, confirmPassword } = this.state;
    
    this.setState({ error: '' });

    if (email.trim() === '') {
      this.setState({ error: "*email field should not be empty" });
      return;
    }

    if (password.trim() < 5) {
      this.setState({ error: "*password should be atleast 6 char" });
      return;
    }

    if (password.trim() !== confirmPassword.trim()) {
      this.setState({ error: "*password not match" });
      return;
    }

    if (email.trim() !== '' || password.trim() !== '' || confirmPassword.trim() !== '') {
      this.setState({loading: true, error: ''});
      try {
        await auth.createUserWithEmailAndPassword( email, password );
        this.setState({
          email: "",
          password: "",
          confirmPassword: "",
          loading: false
        });
        this.props.history.replace("/");
      } catch (error) {
        this.setState({ loading: false, error: "*failed in creating account!" });
      }
    }
  }
  
  render() {
    const { email, password, confirmPassword, loading, error } = this.state;

    return (
      <div className={styles.Container}>
        <form onSubmit={this.handleSubmit} className={styles.Signup}>
          <h4>Signup to BurgerBuilder</h4>
          <FormInput 
            type="email" 
            name="email" 
            label="Email" 
            change={this.handleChange} 
            value={email} />
          <FormInput 
            type="password" 
            name="password" 
            label="Create Password" 
            change={this.handleChange} 
            value={password} />
          <FormInput 
            type="password" 
            name="confirmPassword" 
            label="Confirm Password" 
            change={this.handleChange} 
            value={confirmPassword} />
          { error && <p className={styles.ErrorMsg}>{error}</p> }
          <Button primary>
            { loading ? "creating..." : "create account" }
          </Button>
        </form>
        <SigninAndSignup message="Already have an account? " path="signin"/>
      </div>
    );
  }
}

export default Signup;