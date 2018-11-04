import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {compose} from 'redux';
import {connect} from 'react-redux';

import * as actions from '../../store/auth/actions';
import authField from './auth_field';
import './auth_field.css';

class SignUp extends Component {
  onSubmit = (formProps) => {
    this.props.signup(formProps, () => {
      this.props.history.push('/');
    });
  };

  render() {
    const {handleSubmit} = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit)} className="auth-form">
        <Field
          label="Name"
          name="name"
          type="text"
          component={authField}
          autoComplete="none"
        />
        <Field
          label="Email"
          name="email"
          type="text"
          component={authField}
          autoComplete="none"
        />
        <Field
          label="Password"
          name="password"
          type="password"
          component={authField}
          autoComplete="none"
        />
        <div>{this.props.errorMessage}</div>
        <button>Sign up</button>
      </form>
    )
  }
}

function mapStateToProps(state){
  return {errorMessage: state.auth.errorMessage};
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({form: 'signup'})
)(SignUp);
