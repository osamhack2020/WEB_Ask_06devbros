import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { USERS } from '../constants/entity';
import * as registerService from '../service/registerService';

// Import custom components
import RegisterForm from '../components/Form/RegisterForm';

class RegisterContainer extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  /**
   * Submit the form.
   *
   * @param {object} formProps
   */
  submitForm(formProps) {
    console.log(formProps);
    this.props.actions.register(formProps);
  }

  render() {
    return <RegisterForm onSubmit={this.submitForm} errorMessage={this.props.errorMessage} />;
  }
}

/**
 * Map the state to props.
 */
const mapStateToProps = (state) => ({
  values: state.form.values,
});

/**
 * Map the actions to props.
 */
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Object.assign({}, registerService), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);