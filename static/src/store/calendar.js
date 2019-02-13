// Quack! This is a duck. https://github.com/erikras/ducks-modular-redux

import axios from 'axios';
import _ from 'lodash';
import {getApiDeleteRequest, getApiGetRequest, getApiPostRequest} from './helpers/api_helpers';

export const ADD_DAY_ITEM = 'add_day_item';
export const FETCH_CALENDAR = 'fetch_calendar';
export const DELETE_DAY_ITEM = 'delete_day_item';

export default reducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_DAY_ITEM:
      return {
        ...state,
        [action.payload.dateId]:
          [
            ...(state[action.payload.dateId] || []),
            {mealId: action.payload.mealId, calendarItemId: action.payload.calendarItemId},
          ],
      };

    case FETCH_CALENDAR:
      return action.payload;

    case DELETE_DAY_ITEM:
      return {
        ...state,
        [action.payload.dateId]:
          _.reject(state[action.payload.dateId],
            el => {
              return el.calendarItemId === action.payload.calendarItemId;
            },
          ),
      };

    default:
      return state;
  }
};


const CALENDAR_API = '/calendar/';

export const addDayItem = (mealId, dateId) => async (dispatch, getState) => {
  try {
    const {auth: {authenticated: token}} = getState();
    const data = {
      'meal_id': mealId,
      'date_id': dateId,
    };

    const apiRequest = getApiPostRequest(CALENDAR_API, token, data);
    const response = await axios(apiRequest);
    let {id} = response.data;

    dispatch({
      type: ADD_DAY_ITEM,
      payload: {
        dateId,
        mealId,
        calendarItemId: id,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteDayItem = (dateId, calendarItemId) => async (dispatch, getState) => {
  try {
    const {auth: {authenticated: token}} = getState();
    const apiRequest = getApiDeleteRequest(CALENDAR_API + calendarItemId, token);

    dispatch({
      type: DELETE_DAY_ITEM,
      payload: {dateId, calendarItemId},
    });

    axios(apiRequest);
  } catch (err) {
    console.log(err);
  }
};

export const fetchCalendar = () => async (dispatch, getState) => {
  try {
    const {auth: {authenticated: token}} = getState();
    const apiRequest = getApiGetRequest(CALENDAR_API, token);
    const response = await axios(apiRequest);

    let processedCalendar = processCalendarData(response.data);
    dispatch({
      type: FETCH_CALENDAR,
      payload: processedCalendar,
    });
  } catch (err) {
    console.log(err);
  }
};

function processCalendarData(calendarItems) {
  let calendar = {};

  calendarItems.forEach(item => {
    calendar[item.date_id] = [...(calendar[item.date_id] || []), {mealId: item.meal_id, calendarItemId: item.id}]
  });

  return calendar;
};