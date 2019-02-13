import React from 'react';

import MealButtons from './meal_buttons';
import {MEAL_UNIT} from '../../store/constants/meals';

import "./meal.scss";


export default function Meal(props) {
  const { meal: {name, description, servings, created_at, steps, ingredients, id}, deleteMeal } = props;
  return (
    <section className='meal'>
      <h1>{name}</h1>
      <div className='meal-info'>
        <span>Created on {(new Date(created_at)).toDateString()}</span>
        <span>{servings} serving{servings != 1 ? 's' : ''}</span>
      </div>
      <p>{description}</p>
      {
        steps.length > 0 && <Steps steps={steps}/>
      }

      {
        ingredients.length > 0 && <Ingredients ingredients={ingredients}/>
      }
      <MealButtons deleteMeal={deleteMeal} submitting={props.submitting} mealId={id}/>
    </section>
  );
}

function Steps(props) {
  return (
    <React.Fragment>
      <h2>Steps</h2>
      <ol className='meal-steps'>
        <StepsList steps={props.steps}/>
      </ol>
    </React.Fragment>
  )
}

function StepsList(props) {
  return (
    props.steps.map((step, index) => {
      return <li key={index}>{step.step}</li>
    })
  )
}

function Ingredients(props) {
  return (
    <React.Fragment>
      <h2>Ingredients</h2>
      <table className='meal-ingredients'>
        <tbody>
          {props.ingredients.map((ingredient, index) => {
            return <IngredientsTableRow ingredient={ingredient} key={index}/>
          })}
        </tbody>
      </table>
    </React.Fragment>

  )
}

function IngredientsTableRow(props) {
  const { ingredient, qty, unit } = props.ingredient;

  return (
    <tr>
      <td><span title={ingredient}>{ingredient}</span></td>
      <td>{qty}</td>
      <td>{MEAL_UNIT[unit].shoppingListName}</td>
    </tr>
  )
}