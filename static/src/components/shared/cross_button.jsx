import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import './buttons.scss';

export default function CrossButton(props) {
  return (
    <button type='button' title={props.title} onClick={() => props.handleClick()} className='increment-button'>
      <FontAwesomeIcon icon='times-circle'/>
    </button>
  );
}