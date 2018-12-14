import {ADD_DAY_ITEM, FETCH_CALENDAR} from './types';
import {getApiGetRequest, getApiPostRequest} from '../helpers/api_helpers';
import axios from 'axios';
import {FETCH_MEALS} from '../meals/types';

const CALENDAR_API = '/calendar/';

export const addDayItem = (mealId, dateId) => async (dispatch, getState) =>  {
  try {
    const { auth: {authenticated: token} } = getState();
    const data = {
      'meal_id': mealId,
      'meal_date': dateId,
      'meal_time': 'BREAKFAST' //TODO: remove enum?
    };

    const apiRequest = getApiPostRequest(CALENDAR_API, token, data);
    const response = await axios(apiRequest);

    dispatch({
      type: ADD_DAY_ITEM,
      payload: {
        dateId,
        mealId
      }
    });
  } catch (err) {
    console.log(err);
  }
};

function processCalendarData(calendarItems) {
  let calendar = {};

  calendarItems.forEach(item => {
    calendar[item.meal_date] = [...(calendar[item.meal_date] || []), item.meal_id]
  });

  return calendar;
}

export const fetchCalendar = () =>  async (dispatch, getState) => {
  try {
    const { auth: {authenticated: token} } = getState();
    const apiRequest = getApiGetRequest(CALENDAR_API, token);
    const response = await axios(apiRequest);

    let processedCalendar = processCalendarData(response.data);
    dispatch({
      type: FETCH_CALENDAR,
      payload: processedCalendar
    });
  } catch (err) {
    console.log(err);
  }
};