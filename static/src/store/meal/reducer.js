import {FETCH_MEAL, CLEAR_MEAL} from "./types";

export default (state = {}, action) => {
  switch (action.type){
    case FETCH_MEAL:
      return action.payload;
    case CLEAR_MEAL:
      return {};
    default:
      return state;
  }
}