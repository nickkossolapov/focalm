import React from 'react';


import './shopping_list.scss';

export default function ShoppingListHeader(props) {
  return <div className='shopping-list-header'>
    <h2>Shopping List</h2>
    <div className='toggle-block'>
      <label>Sort by meals</label>
      <label className="toggle">
        <input type="checkbox" checked={props.sortByMeals} onClick={() => props.handleSortToggle(!props.sortByMeals)}/>
        <span className="slider"></span>
      </label>
    </div>
  </div>
}