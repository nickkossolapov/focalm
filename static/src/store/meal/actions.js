import axios from 'axios';
import {FETCH_MEAL, CLEAR_MEAL} from "./types";

const ROOT_URL = process.env.API_URL;

export const fetchMeal = (id) =>  async (dispatch, getState) => {
  try {
    const { auth: {authenticated: token} } = getState();
    const apiRequest = {
      method: 'GET',
      url: ROOT_URL + '/meals/' + id,
      headers: {
        ...(token && {token: token})
      }
    };
    const response = await axios(apiRequest);
    console.log(response);

    dispatch({
      type: FETCH_MEAL,
      payload: response.data
    });
  } catch (err) {
    console.log(err);
  }
};

export function clearMeal() {
  return {
    type: CLEAR_MEAL
  }
}