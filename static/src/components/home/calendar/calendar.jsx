import React, {Component} from 'react';

import Day from './day';
import './calendar.css';
import requireAuth from "../../shared/require_auth";
import connect from "react-redux/es/connect/connect";
import {fetchCalendar} from "../../../store/calendar/actions";


class Calendar extends Component {
  componentDidMount() {
    this.props.fetchCalendar();
  }

  getDates() {
    let indexDate = new Date(Date.now());
    indexDate.setDate(indexDate.getDate() - (indexDate.getDay() + 1));
    let dates = [];

    for (let i = 0; i < 28; i++){
      indexDate.setDate(indexDate.getDate() + 1);
      let day = padWithZeroes(indexDate.getDate() + 1),
          month = padWithZeroes(indexDate.getMonth() + 1),
          year = indexDate.getFullYear();

      dates.push({
        day,
        month,
        year,
        dateId: `${year}${month}${day}`
      });
    }

    return dates;
  }

  render() {
    const dates = this.getDates();
    return (
      <ul className='calendar'>
        <DaysOfWeek />
        {dates.map(({day, month, year, dateId}) => {
          return <Day key={day} day={day} month={month} year={year} dateId={dateId}/>
        })}
      </ul>
    );
  }
}

function padWithZeroes(num) {
  return ('0' + num).slice(-2);
}

function DaysOfWeek(props) {
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return days.map((day) => {
    return <li key={day}>{day}</li>
  });
}

export default requireAuth(
  connect(null, {fetchCalendar})(Calendar)
);