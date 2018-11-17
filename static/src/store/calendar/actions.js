import {ADD_DAY_ITEM} from "./types";
import {getApiPostRequest} from "../helpers/api_helpers";
import axios from "axios";

const CALENDAR_API = '/calendar/';

export const addDayItem = (mealId, dateId) => async (dispatch, getState) =>  {
  try {
    const { auth: {authenticated: token} } = getState();
    const data = {
      "meal_id": mealId,
      "meal_date": dateId,
      "meal_time": "BREAKFAST" //TODO: remove enum?
    };

    const apiRequest = getApiPostRequest(CALENDAR_API, token, data);
    const response = await axios(apiRequest);

    dispatch({
      type: ADD_DAY_ITEM,
      payload: {
        dateId,
        mealId
      }
    });
  } catch (err) {
    console.log(err);
  }
};