import React from 'react';
import {Link} from 'react-router-dom';

import Spinner from '../shared/spinner';

import './meal_buttons.scss';

export default function MealButtons(props) {
  return (
    <div className='shopping-list-btns no-print'>
      <Link to='/' className='shopping-list-link-btn'>
        Home
      </Link>
      <Link to={`/edit/${props.mealId}`} className='shopping-list-link-btn'>
        Edit
      </Link>
      <button className='shopping-list-btn' type='button' onClick={props.deleteMeal}>
        { props.submitting ? <Spinner className='meal-delete-btn-spinner'/> : 'Delete' }
      </button>
    </div>
  )
}