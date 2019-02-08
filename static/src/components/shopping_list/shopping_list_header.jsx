import React from 'react';


import './shopping_list_header.scss';

export default function ShoppingListHeader(props) {
  return <div className='shopping-list-header no-print'>
    <h2>Shopping List</h2>
    <div className='toggle-block'>
      <label className='toggle-label'>Sort by meals</label>
      <label className="toggle">
        <input type="checkbox" checked={props.sortByMeals} onClick={() => props.handleSortToggle(!props.sortByMeals)}/>
        <span className="slider"></span>
      </label>
    </div>
  </div>
}