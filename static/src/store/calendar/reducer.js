import {ADD_DAY_ITEM, FETCH_CALENDAR} from './types';
import _ from 'lodash';

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_DAY_ITEM:
      return {
        ...state,
        [action.payload.dateId]: [...(state[action.payload.dateId] || []), action.payload.mealId]
      };

    case FETCH_CALENDAR:
      return _.mapKeys(action.payload, 'meal_date');

    default:
      return state;
  }
}