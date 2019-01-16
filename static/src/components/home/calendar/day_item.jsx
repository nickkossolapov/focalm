import React from 'react';
import connect from 'react-redux/es/connect/connect';
import {deleteDayItem} from '../../../store/calendar/actions';
import CrossButton from "../../shared/cross_button";

function DayItem(props) {
  return(
    <li>
      <p className='day-item-title'>{props.name}</p>
      <CrossButton
        title="Remove Meal"
        handleClick={() => {
          props.deleteDayItem(props.dateId, props.calendarItemId);
        }}
      />
    </li>
  );
}

export default connect(null, {deleteDayItem})(DayItem);