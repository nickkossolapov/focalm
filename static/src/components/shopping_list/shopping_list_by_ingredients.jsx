import React from 'react';

import {MEAL_UNIT} from '../../store/constants/meals';

import './shopping_list.scss';

export default function ShoppingListByIngredients(props) {
  const { items } = props;
  return (
    <tbody>
    {items.map(item => {
      return (
        <tr>
          <td>{item.mealName}</td>
          <td>{item.ingredient.ingredient}</td>
          <td>{item.ingredient.qty}</td>
          <td>{MEAL_UNIT[item.ingredient.unit].name}</td>
          <td>x{item.qty}</td>
        </tr>
      )
    })}
    </tbody>
  )
}