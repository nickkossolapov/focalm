import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {compose} from 'redux';
import {connect} from 'react-redux';

import * as actions from '../../store/auth/actions';
import authField from './auth_field';
import './auth.css';

class SignIn extends Component {
  onSubmit = (formProps) => {
    this.props.signin(formProps, () => {
      this.props.history.push('/');
    });
  };

  render() {
    const {handleSubmit} = this.props;

    return (
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
        <div>{this.props.errorMessage}</div>
        <button>Sign in</button>
      </form>
    )
  }
}

function mapStateToProps(state){
  return {errorMessage: state.auth.errorMessage};
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({form: 'signin'})
)(SignIn);
