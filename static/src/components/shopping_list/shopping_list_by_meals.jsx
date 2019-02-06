import React from 'react';

import {MEAL_UNIT} from '../../store/constants/meals';

import './shopping_list.scss';

export default function ShoppingListByMeals(props) {
  const { items } = props;
  return (
    <tbody>
    {items.map(item => {
      return (item.meal.ingredients.length > 0) && <MealTableRow meal={item.meal} qty={item.qty}/>
    })}
    </tbody>
  )
}

function MealTableRow(props) {
  const { meal, qty } = props;

  return (
    meal.ingredients.map((ingredient, index) => {
      return (
        <tr>
          {(index == 0) && <td rowSpan={meal.ingredients.length}>{meal.name}</td>}
          <td>{ingredient.ingredient}</td>
          <td>{ingredient.qty}</td>
          <td>{MEAL_UNIT[ingredient.unit].name}</td>
          <td>x{qty}</td>
        </tr>
      )
    })
  )
}