import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {compose} from 'redux';
import {connect} from 'react-redux';

import { signup } from '../../store/auth';
import authField from './auth_field';
import './auth.css';
import SubmitButton from './signin';

class SignUp extends Component {
  onSubmit = (formProps) => {
    document.activeElement.blur();

    this.props.signup(formProps, () => {
      this.props.history.push('/');
    });
  };

  render() {
    const {handleSubmit} = this.props;

    return (
      <div className='auth-grid'>
        <form onSubmit={handleSubmit(this.onSubmit)} className='auth-form'>
          <Field
            label='Name'
            name='name'
            type='text'
            component={authField}
            autoComplete='none'
          />
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
          <div className='auth-error-message'>{this.props.errorMessage}</div>
          <SubmitButton label="Sign up" loading={this.props.loading}/>
        </form>
      </div>

    )
  }
}

function mapStateToProps(state){
  return {errorMessage: state.auth.errorMessage, loading: state.auth.loading};
}

export default compose(
  connect(mapStateToProps, { signup }),
  reduxForm({form: 'signup'})
)(SignUp);
