import React from 'react';

import './submit_button.scss';
import Spinner from '../shared/spinner';

export default function SubmitButton(props) {
  if (props.loading) {
    return (
      <button className='auth-submit-button'>
        <Spinner className='submit-button-spinner' />
      </button>
    )
  } else {
    return <button className='auth-submit-button'><span>{props.label}</span></button>
  }
}