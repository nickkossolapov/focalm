import {ADD_DAY_ITEM} from "./types";
import {getApiPostRequest} from "../helpers/api_helpers";
import axios from "axios";

const CALENDAR_API = "/api/calendar/";

export const addDayItem = (mealId, dateId) => async (dispatch, getState) =>  {
  try {
    const { auth: {authenticated: token} } = getState();

    // const apiRequest = getApiPostRequest(CALENDAR_API, token, );
    // const response = await axios(apiRequest);

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