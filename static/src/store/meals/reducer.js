import _ from 'lodash';
import {FETCH_MEALS, FETCH_MEAL} from "./types";

export default (state = {}, action) => {
  switch (action.type){
    case FETCH_MEALS:
      return _.mapKeys(action.payload, "id");
    case FETCH_MEAL:
      return {...state, [action.payload.id]: action.payload};
    default:
      return state;
  }
}