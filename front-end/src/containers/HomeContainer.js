import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as authService from '../service/authService';

// Import custom components
import Home from '../components/Home';

class HomeContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Home isAuthenticated={this.props.isAuthenticated}/>;
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

export default connect(mapStateToProps, null)(HomeContainer);