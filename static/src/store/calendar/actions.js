import {ADD_DAY_ITEM} from "./types";

export const addDayItem = (mealId, dateId) => async (dispatch) =>  {
  dispatch({
    type: ADD_DAY_ITEM,
    payload: {
      dateId,
      mealId
    }
  });
};