// Quack! This is a duck. https://github.com/erikras/ducks-modular-redux

import axios from 'axios';
import _ from 'lodash';
import {getApiDeleteRequest, getApiGetRequest, getApiPostRequest} from './helpers/api_helpers';

const ADD_DAY_ITEM = 'focalm/calendar/add_day_item';
const FETCH_CALENDAR = 'focalm/calendar/fetch_calendar';
const DELETE_DAY_ITEM = 'focalm/calendar/delete_day_item';
const CLEAR_CALENDAR = 'focalm/calendar/clear_calendar';
const CALENDAR_LOADING = 'focalm/calendar/calendar_loading';
const TOGGLE_DAY_LOADING = 'focalm/calendar/toggle_day_loading';

const INITIAL_STATE = {
  loading: false,
  loadingDays: []
};

export default function reducer(state = INITIAL_STATE, action) {
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

    case CLEAR_CALENDAR:
      return INITIAL_STATE;

    case CALENDAR_LOADING:
      return {...state, loading: action.payload};

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

    dispatch({
      type: CALENDAR_LOADING,
      payload: true,
    });

    const response = await axios(apiRequest);

    let processedCalendar = processCalendarData(response.data);
    dispatch({
      type: FETCH_CALENDAR,
      payload: processedCalendar,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: CALENDAR_LOADING,
      payload: false,
    });
  }
};

export const refreshCalendar = () => (dispatch) => {
  dispatch({
    type: CLEAR_CALENDAR
  });

  dispatch(fetchCalendar());
};

function processCalendarData(calendarItems) {
  let calendar = {};

  calendarItems.forEach(item => {
    calendar[item.date_id] = [...(calendar[item.date_id] || []), {mealId: item.meal_id, calendarItemId: item.id}]
  });

  return calendar;
}
