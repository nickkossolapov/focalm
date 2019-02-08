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
        <tr className={(index == 0) ? 'new-meal-line' : undefined} key={index}>
          {(index == 0) && <td rowSpan={meal.ingredients.length}>
            <span title={meal.name}>{meal.name}</span>
          </td>}
          <td><span title={ingredient.ingredient}>{ingredient.ingredient}</span></td>
          <td>{ingredient.qty}</td>
          <td>{MEAL_UNIT[ingredient.unit].shoppingListName + (qty > 1 && qty ? `x${qty}` : '')}</td>
        </tr>
      )
    })
  )
}