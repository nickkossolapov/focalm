import _ from 'lodash';
import {FETCH_MEALS} from "./types";

export default (state = {}, action) => {
  switch (action.type){
    case FETCH_MEALS:
      return _.mapKeys(action.payload, "id");
    default:
      return state;
  }
}