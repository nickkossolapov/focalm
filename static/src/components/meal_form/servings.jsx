import React from 'react';

import './servings.scss';

export default function Servings(props) {
  const { input: { value, onChange } } = props;

  return (
    <div className='meal-form-servings'>
      <label>Servings</label>
      <button
        className='meal-form-servings-btn'
        type="button"
        onClick={() => onChange(BoundServings(parseInt(value) - 1))}
      >
        -
      </button>
      <span>{value}</span>
      <button
        className='meal-form-servings-btn'
        type="button"
        onClick={() => onChange(BoundServings(parseInt(value) + 1))}
      >
        +
      </button>
    </div>
  );
}

function BoundServings(num) {
  return Math.max(Math.min(num, 9), 0);
}