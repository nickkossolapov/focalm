import React from 'react';
import {Link} from 'react-router-dom';

import './shopping_list_buttons.scss';

export default function ShoppingListButtons() {
  return (
    <div className='shopping-list-btns no-print'>
      <button className='shopping-list-btn' type='button' onClick={() => window.print()}>
        Print
      </button >
      <Link to='/' className='shopping-list-back-btn'>
        Home
      </Link>
    </div>
  )
}