import React from 'react';
import {Link} from 'react-router-dom';

import './selector.scss';

function handleClick(func){
  document.activeElement.blur();
  return func;
}

export function SelectorButtons(props) {
  const { clearSelection, cancelSelection, doneSelecting, isSelecting } = props;

  return (
    <div className='selector-btns'>
      <Link to='/shoppinglist' className={'selector-btn-link' + (doneSelecting ? '' : '  disabled')}>
        Get list
      </Link>
      <button className='selector-btn' onClick={handleClick(clearSelection)}>
        Clear
      </button>
      <button className='selector-btn' onClick={handleClick(cancelSelection)}>
        Cancel
      </button>
    </div>
  );
}