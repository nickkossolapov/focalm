import React from 'react';
import {Link} from 'react-router-dom';

import './meal_form_buttons.scss'
import Spinner from '../shared/spinner';

function handleClick(callback){
  document.activeElement.blur();
  callback();
}

export default function MealFormButtons(props) {
  const { submitting, reset } = props;

  return (
    <div className='meal-form-btns'>
      <button className='meal-form-btn' type='submit' disabled={submitting}>
        { submitting ? <Spinner className='meal-form-spinner'/> : 'Submit' }
      </button>
      <button className='meal-form-btn' type='button' disabled={submitting} onClick={() => handleClick(reset)}>
        Reset
      </button >
      <Link to='/' className={'meal-form-cancel-btn' + (submitting ? '  disabled' : '')}>
        Cancel
      </Link>
    </div>
  );
}