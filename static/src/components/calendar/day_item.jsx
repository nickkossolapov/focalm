import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import connect from 'react-redux/es/connect/connect';
import {deleteDayItem} from '../../store/calendar/actions';

function DayItem(props) {
  return(
    <li>
      <p className='day-item-title'>{props.name}</p>

      <button
        onClick={() => {
          console.log(props);
          props.deleteDayItem(props.dateId, props.calendarItemId);
        }}
        className='increment-button day-item-button'
      >
        <FontAwesomeIcon icon='times-circle' />
      </button>
    </li>
  );
}

export default connect(null, {deleteDayItem})(DayItem);