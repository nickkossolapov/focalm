import React from 'react';
import {Link} from 'react-router-dom';

import MealList from './meal_list';
import './sidebar.css';

export default function Sidebar(props) {
  return (
    <div>
      <button className='create-meal-button'>
        <Link to='/meal/create'>Create Meal</Link>
      </button>
      <MealList className='home-meals'/>
    </div>
  )
}