import React from 'react';
import {Link} from 'react-router-dom';

import './meal_buttons.scss';

export default function MealButtons(props) {
  return (
    <div className='shopping-list-btns no-print'>
      <button className='shopping-list-btn' type='button' onClick={props.deleteMeal}>
        Delete
      </button >
      <Link to='/' className='shopping-list-back-btn'>
        Home
      </Link>
    </div>
  )
}