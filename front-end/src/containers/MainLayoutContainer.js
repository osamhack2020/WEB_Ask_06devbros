import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Import custom components
import MainLayout from '../components/Layout/MainLayout';

import * as authService from '../service/authService';

class MainLayoutContainer extends Component {
  constructor(props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
  }

  /**
   * Logout the form.
   */
  onLogout() {
    this.props.actions.logout();
  }


  render() {
    return <MainLayout onLogout={this.onLogout} errorMessage={this.props.errorMessage} children={this.props.children}/>;
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

/**
 * Map the actions to props.
 */
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Object.assign({}, authService), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainLayoutContainer);