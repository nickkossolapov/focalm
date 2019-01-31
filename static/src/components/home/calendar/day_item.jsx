import React from 'react';
import connect from 'react-redux/es/connect/connect';

import {deleteDayItem} from '../../../store/calendar/actions';
import './day_item.scss'

function DayItem(props) {
  return(
    <li
      className='day-item'
      title={props.name}
      onClick={() => {
        props.deleteDayItem(props.dateId, props.calendarItemId);
      }}
    >
      {props.name}
    </li>
  );
}

export default connect(null, {deleteDayItem})(DayItem);