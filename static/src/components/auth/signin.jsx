import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {compose} from 'redux';
import {connect} from 'react-redux';

import {clearErrors, signin} from '../../store/auth';
import authField from './auth_field';
import SubmitButton from './submit_button';

import './auth.css';


class SignIn extends Component {
  onSubmit = (formProps) => {
    document.activeElement.blur();

    this.props.signin(formProps, () => {
      this.props.history.push('/');
    });
  };

  componentWillUnmount() {
    this.props.clearErrors();
  };

  render() {
    const {handleSubmit} = this.props;
    const errorMessage = this.props.credentialsError || this.props.authError;

    return (
      <div className='auth-grid'>
        <form onSubmit={handleSubmit(this.onSubmit)} className='auth-form'>
          <Field
            label='Email'
            name='email'
            type='text'
            component={authField}
            autoComplete='none'
          />
          <Field
            label='Password'
            name='password'
            type='password'
            component={authField}
            autoComplete='none'
          />
          <div className='auth-error-message'>{errorMessage}</div>
          <SubmitButton label="Sign in" loading={this.props.loading}/>
        </form>
      </div>
    )
  }
}

function validate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.password) {
    errors.password = 'Required';
  }
  return errors;
}

function mapStateToProps(state){
  const {credentialsError, authError, validationError, loading} = state.auth;
  return {credentialsError, authError, validationError, loading};
}

export default compose(
  connect(mapStateToProps, {signin, clearErrors}),
  reduxForm({validate, form: 'signin'})
)(SignIn);
