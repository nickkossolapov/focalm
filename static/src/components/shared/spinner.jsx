import React from 'react';

import './spinner.scss'

export default function Spinner(props) {
  return (
    <div className={'spinner ' + props.className}>
      <div className='bounce1'></div>
      <div className='bounce2'></div>
      <div className='bounce3'></div>
    </div>
  )
}