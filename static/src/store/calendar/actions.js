import {ADD_DAY_ITEM, DELETE_DAY_ITEM, FETCH_CALENDAR} from './types';
import {getApiDeleteRequest, getApiGetRequest, getApiPostRequest} from '../helpers/api_helpers';
import axios from 'axios';

const CALENDAR_API = '/calendar/';

export const addDayItem = (mealId, dateId) => async (dispatch, getState) =>  {
  try {
    const { auth: {authenticated: token} } = getState();
    const data = {
      'meal_id': mealId,
      'date_id': dateId
    };

    const apiRequest = getApiPostRequest(CALENDAR_API, token, data);
    const response = await axios(apiRequest);
    let {id} = response.data;

    dispatch({
      type: ADD_DAY_ITEM,
      payload: {
        dateId,
        mealId,
        calendarItemId: id
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteDayItem = (dateId, calendarItemId) => async (dispatch, getState) => {
  try {
    const { auth: {authenticated: token} } = getState();
    const apiRequest = getApiDeleteRequest(CALENDAR_API + calendarItemId, token);
    await axios(apiRequest);

    dispatch({
      type: DELETE_DAY_ITEM,
      payload: {dateId, calendarItemId}
    });
  } catch (err) {
    console.log(err);
  }
};

function processCalendarData(calendarItems) {
  let calendar = {};

  calendarItems.forEach(item => {
    calendar[item.meal_date] = [...(calendar[item.meal_date] || []), {mealId: item.meal_id, calendarItemId: item.id}]
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
