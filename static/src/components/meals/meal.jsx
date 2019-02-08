import React from 'react';
import MealButtons from './meal_buttons';

import "./meal.scss";

export default function Meal(props) {
  const { meal: {name, description, servings, created_at}, deleteMeal } = props;
  return (
    <section className='meal'>
      <h3>{name}</h3>
      <h6>{description}</h6>
      <p>{servings} servings</p>
      <p>Created on {created_at}</p>
      <MealButtons deleteMeal={deleteMeal}/>
    </section>
  );
}