import axios from 'axios';
import {FETCH_MEALS} from "./types";

const ROOT_URL = process.env.API_URL;

export const fetchMeals = () =>  async (dispatch, getState) => {
  try {
    const { auth: {authenticated: token} } = getState();
    const apiRequest = {
      method: 'GET',
      url: ROOT_URL + '/meals/',
      headers: {
        ...(token && {token: token})
      }
    };
    const response = await axios(apiRequest);

    dispatch({
      type: FETCH_MEALS,
      payload: response.data
    });
  } catch (err) {
    console.log(err);
  }
}
