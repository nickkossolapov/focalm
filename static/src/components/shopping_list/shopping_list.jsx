import React from 'react';

import ShoppingListByIngredients from './shopping_list_by_ingredients';
import ShoppingListByMeals from './shopping_list_by_meals';
import ShoppingListHeader from './shopping_list_header';

import './shopping_list.scss';


export default function ShoppingList(props) {
  return (
    <section className='shopping-list'>
      <ShoppingListHeader sortByMeals={props.sortByMeals} handleSortToggle={props.handleSortToggle} />
      <div className='shopping-list-main'>
        <table className='shopping-list-content' cellSpacing='0' cellPadding='0'>
          <thead>
            <tr>
              <th>Meal</th>
              <th>Ingredient</th>
              <th colSpan='2'>Qty</th>
            </tr>
          </thead>
          {
            props.sortByMeals
              ? <ShoppingListByMeals items={props.itemsSortedByMeals}/>
              : <ShoppingListByIngredients items={props.itemsSortedByIngredients}/>
          }
        </table>
      </div>
    </section>
  )
}