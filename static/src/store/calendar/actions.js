import {ADD_DAY_ITEM} from "./types";

export const addDayItem = (meal, dateId) => async (dispatch) =>  {
  dispatch({
    type: ADD_DAY_ITEM,
    payload: {
      dateId,
      mealName: meal.name
    }
  });
};