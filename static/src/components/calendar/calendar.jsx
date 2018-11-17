import React, {Component} from 'react';

import Day from './day';
import './calendar.css';
import requireAuth from "../require_auth";
import connect from "react-redux/es/connect/connect";
import {fetchMeals} from "../../store/meals/actions";
import {fetchCalendar} from "../../store/calendar/actions";

function getDates() {
  let indexDate = new Date(Date.now());
  indexDate.setDate(indexDate.getDate() - (indexDate.getDay() + 1));
  let dates = [];

  for (let i = 0; i < 28; i++){
    indexDate.setDate(indexDate.getDate() + 1);
    let day = indexDate.getDate(),
        month = indexDate.getMonth(),
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

function renderDayNames() {
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return days.map((day) => {
    return <li key={day}>{day}</li>
  });
}

class Calendar extends Component {
  componentDidMount() {
    this.props.fetchCalendar();
  }

  render() {
    const dates = getDates();
    return (
      <ul className="calendar">
        {renderDayNames()}
        {dates.map(({day, month, year, dateId}) => {
          return <Day key={day} day={day} month={month} year={year} dateId={dateId}/>
        })}
      </ul>
    );
  }
}

export default requireAuth(
  connect(null, {fetchCalendar})(Calendar)
);