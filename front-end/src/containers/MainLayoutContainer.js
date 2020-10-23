import React, { Component } from 'react';
import { connect } from 'react-redux';

// Import custom components
import MainLayout from '../components/Layout/MainLayout';

class MainLayoutContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <MainLayout onSubmit={this.submitForm} errorMessage={this.props.errorMessage} isAuthenticated={this.props.isAuthenticated}/>;
  }
}

/**
 * Map the state to props.
 */
const mapStateToProps = (state) => ({
  token: state.auth.token,
  isAuthenticated: state.auth.isAuthenticated,
  errorMessage: state.auth.errorMessage,
});

export default connect(mapStateToProps, null)(MainLayoutContainer);