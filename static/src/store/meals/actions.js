import axios from 'axios';
import {CREATE_MEAL, FETCH_MEAL, FETCH_MEALS} from "./types";
import {SubmissionError} from "redux-form";

const ROOT_URL = process.env.API_URL;

export const createMeal = (meal, callback) => async (dispatch, getState) => {
  try {
    console.log(meal);

    const { auth: {authenticated: token} } = getState();
    const apiRequest = {
      method: 'POST',
      url: ROOT_URL + '/meals/',
      headers: {
        ...(token && {token: token})
      },
      data: meal
    };

    const response = await axios(apiRequest);

    dispatch({
      type: CREATE_MEAL,
      payload: response.data
    });
    callback(response.data.id);
  } catch (err) {
    console.log(err);
    throw new SubmissionError({ username: 'User does not exist', _error: 'Login failed!' })
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

