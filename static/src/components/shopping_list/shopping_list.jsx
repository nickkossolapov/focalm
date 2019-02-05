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
        {
          props.sortByMeals
            ? <ShoppingListByMeals items={props.itemsSortedByMeals}/>
            : <ShoppingListByIngredients items={props.itemsSortedByIngredients}/>
        }
      </div>
    </section>
  )
}