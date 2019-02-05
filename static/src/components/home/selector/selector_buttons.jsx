import React from 'react';
import {Link} from 'react-router-dom';

import './selector.scss';

function handleClick(callback){
  document.activeElement.blur();
  callback();
}

export function SelectorButtons(props) {
  const { clearSelection, cancelSelection, doneSelecting } = props;

  return (
    <div className='selector-btns'>
      <Link to='/shoppinglist' className={'selector-btn-link' + (doneSelecting ? '' : '  disabled')}>
        Get list
      </Link>
      <button className='selector-btn' onClick={() => handleClick(clearSelection)}>
        Clear
      </button>
      <button className='selector-btn' onClick={() => handleClick(cancelSelection)}>
        Cancel
      </button>
    </div>
  );
}