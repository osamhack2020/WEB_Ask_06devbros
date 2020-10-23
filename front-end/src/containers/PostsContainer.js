import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as authService from '../service/authService';

// Import custom components
import PostsForm from '../components/Form/PostsForm';

class PostsContainer extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * Submit the form.
   *
   * @param {object} formProps
   */
  clickContent(formProps) {
    // this.props.actions.login(formProps);
  }

  render() {
    return <PostsForm errorMessage={this.props.errorMessage} />;
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

export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer);