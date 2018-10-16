import React, {Component} from 'react';

import Day from './day';
import './calendar.css';

function getDates() {
  let indexDate = new Date(Date.now());
  indexDate.setDate(indexDate.getDate() - (indexDate.getDay() + 1));
  let dates = [];

  for (let i = 0; i < 28; i++){
    indexDate.setDate(indexDate.getDate() + 1);
    dates.push({
      day: indexDate.getDate(),
      month: indexDate.getMonth()
    });
  }

  return dates;
}

function renderDayNames() {
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return days.map((day) => {
    return <li key={day}>{day}</li>
  });
}

class Calendar extends Component {
  render() {
    const dates = getDates();
    console.log(dates);
    return (
      <ul className="calendar">
        {renderDayNames()}
        {dates.map(({day, month}) => {
          return <Day key={day} day={day} month={month}/>
        })}
      </ul>
    );
  }
}

export default Calendar;