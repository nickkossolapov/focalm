import {ADD_DAY_ITEM, FETCH_CALENDAR, DELETE_DAY_ITEM} from './types';
import _ from 'lodash';

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_DAY_ITEM:
      return {
        ...state,
        [action.payload.dateId]:
          [
            ...(state[action.payload.dateId] || []),
            {mealId: action.payload.mealId, calendarItemId: action.payload.calendarItemId}
          ]
      };

    case FETCH_CALENDAR:
      return action.payload;

    case DELETE_DAY_ITEM:
      return {
        ...state,
        [action.payload.dateId]:
          _.reject(state[action.payload.dateId],
            el => {return el.calendarItemId === action.payload.calendarItemId;}
          )
      };

    default:
      return state;
  }
}