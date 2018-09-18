import axios from 'axios';
import {FETCH_MEALS, FETCH_MEAL} from "./types";

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
};

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

    dispatch({
      type: FETCH_MEAL,
      payload: response.data
    });
  } catch (err) {
    console.log(err);
  }
};
