import React from 'react';
import {Link} from 'react-router-dom';

import MealList from './meal_list';
import './sidebar.css';

export default function Sidebar(props) {
  return (
    <div>
      <MealList className='home-meals'/>
      <Link to='/meal/create'>
        <button className='create-meal-button'>
          Create Meal
        </button>
      </Link>
    </div>
  )
}