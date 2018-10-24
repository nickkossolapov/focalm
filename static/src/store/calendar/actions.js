import {ADD_DAY_ITEM} from "./types";

export const addDayItem = (mealName, dateId) => async (dispatch) =>  {
  dispatch({
    type: ADD_DAY_ITEM,
    payload: {
      dateId,
      mealName
    }
  });
};