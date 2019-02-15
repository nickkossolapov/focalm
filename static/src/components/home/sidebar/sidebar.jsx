import React from 'react';
import {Link} from 'react-router-dom';

import MealList from './meal_list';
import './sidebar.scss';

export default function Sidebar(props) {
  return (
    <div className='sidebar'>
      <MealList className='home-meals'/>
      <Link to='/create'>
        <button className='create-meal-btn'>
          Create Meal
        </button>
      </Link>
    </div>
  )
}