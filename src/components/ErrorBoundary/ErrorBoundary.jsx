import React, { Component } from 'react';

class ErrorBoundary extends Component {
  state = {
    error: null
  }

  componentDidCatch(error) {
    this.setState({ error: error });
    console.log(error);
  }

  render() {
    const { children } = this.props;

    return this.state.error ? <p>Something went wrong</p> : children;
  }
};

export default ErrorBoundary;