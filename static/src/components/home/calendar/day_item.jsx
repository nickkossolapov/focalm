import React from 'react';
import connect from 'react-redux/es/connect/connect';

import {deleteDayItem} from '../../../store/calendar/actions';
import './day_item.scss'

function DayItem(props) {
  const canClear = !(props.isSelecting || props.doneSelecting);

  return(
    <li
      className={'day-item' + (canClear ? ' can-clear' : '')}
      title={props.name}
      onClick={() => {
        if (canClear) {props.deleteDayItem(props.dateId, props.calendarItemId)};
      }}
    >
      {props.name}
    </li>
  );
}

export default connect(null, {deleteDayItem})(DayItem);