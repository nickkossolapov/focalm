// Quack! This is a duck. https://github.com/erikras/ducks-modular-redux

import _ from 'lodash';
import axios from 'axios';
import {SubmissionError} from 'redux-form';

import {getApiDeleteRequest, getApiGetRequest, getApiPostRequest} from './helpers/api_helpers';

const CREATE_MEAL = 'focalm/meals/create_meal';
const FETCH_MEAL = 'focalm/meals/fetch_meal';
const FETCH_MEALS = 'focalm/meals/fetch_meals';
const DELETE_MEAL = 'focalm/meals/delete_meal';


export default function reducer(state = {}, action) {
  switch (action.type) {
    case CREATE_MEAL:
      return {...state, [action.payload.id]: action.payload};

    case FETCH_MEAL:
      return {...state, [action.payload.id]: action.payload};

    case FETCH_MEALS:
      return _.mapKeys(action.payload, 'id');

    case DELETE_MEAL:
      return _.omit(state, action.payload);

    default:
      return state;
  }
};


const MEALS_API = '/meals/';

export const createMeal = (meal, callback) => async (dispatch, getState) => {
  try {
    const {auth: {authenticated: token}} = getState();
    const apiRequest = getApiPostRequest(MEALS_API, token, meal);
    const response = await axios(apiRequest);

    dispatch({
      type: CREATE_MEAL,
      payload: response.data,
    });
    callback(response.data.id);
  } catch (err) {
    console.log(err);
    throw new SubmissionError({username: 'User does not exist', _error: 'Login failed!'})
  }
};

export const fetchMeal = (id) => async (dispatch, getState) => {
  try {
    const {auth: {authenticated: token}} = getState();
    const apiRequest = getApiGetRequest(MEALS_API + id, token);
    const response = await axios(apiRequest);

    dispatch({
      type: FETCH_MEAL,
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const fetchMeals = () => async (dispatch, getState) => {
  try {
    const {auth: {authenticated: token}} = getState();
    const apiRequest = getApiGetRequest(MEALS_API, token);
    const response = await axios(apiRequest);

    dispatch({
      type: FETCH_MEALS,
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteMeal = (mealId, callback) => async (dispatch, getState) => {
  try {
    const {auth: {authenticated: token}} = getState();
    const apiRequest = getApiDeleteRequest(MEALS_API + mealId, token);
    await axios(apiRequest);

    dispatch({
      type: DELETE_MEAL,
      payload: mealId,
    });
    callback();
  } catch (err) {
    console.log(err);
  }
};