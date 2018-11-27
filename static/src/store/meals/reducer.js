import _ from 'lodash';
import {CREATE_MEAL, DELETE_MEAL, FETCH_MEAL, FETCH_MEALS} from './types';

export default (state = {}, action) => {
  switch (action.type){
    case CREATE_MEAL:
      return {...state, [action.payload.id]: action.payload};
    case FETCH_MEAL:
      return {...state, [action.payload.id]: action.payload};
    case FETCH_MEALS:
      return _.mapKeys(action.payload, 'id');
    case DELETE_MEAL:
      return _.omit(state, action.payload);
    default:
      return state;
  }
}