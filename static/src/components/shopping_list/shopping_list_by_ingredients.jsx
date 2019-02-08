import React from 'react';

import {MEAL_UNIT} from '../../store/constants/meals';

import './shopping_list.scss';

export default function ShoppingListByIngredients(props) {
  const { items } = props;
  return (
    <tbody>
    {items.map((item, index) => {
      return (
        <tr key={index}>
          <td><span title={item.mealName}>{item.mealName}</span></td>
          <td><span title={item.ingredient.ingredient}>{item.ingredient.ingredient}</span></td>
          <td>{item.ingredient.qty}</td>
          <td>{MEAL_UNIT[item.ingredient.unit].shoppingListName + (item.qty > 1 && item.qty ? `x${item.qty}` : '')}</td>
        </tr>
      )
    })}
    </tbody>
  )
}