import {ADD_DAY_ITEM} from "./types";

export default (state = {}, action) => {

  switch (action.type) {
    case ADD_DAY_ITEM:
      return {
        ...state,
        [action.payload.dateId]: [...(state[action.payload.dateId] || []), action.payload.mealName]
      };

    default:
      return state;
  }
}