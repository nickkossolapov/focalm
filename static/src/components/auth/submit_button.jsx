import React from 'react';

import './submit_button.css';

export default function SubmitButton(props) {
  if (props.loading) {
    return (
      <button className='auth-submit-button'>
        <div className="spinner">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div>
      </button>
    )
  } else {
    return <button className='auth-submit-button'><span>{props.label}</span></button>
  }
}