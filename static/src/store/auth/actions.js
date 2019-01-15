import axios from 'axios';
import _ from 'lodash'
import {AUTH_USER, AUTH_ERROR} from './types';

const ROOT_URL = process.env.API_URL;

export const signup = (formProps, callback) => async (dispatch) => {
  try{
    const response = await axios.post(ROOT_URL + '/users/signup', formProps);

    dispatch({type: AUTH_USER, payload: response.data.token});
    localStorage.setItem('token', response.data.token);
    callback();
  } catch ({response: {data}}) {
    let errorMessage;

    if (data['error']){
      errorMessage = data['error'];
    }
    else if (_.size(data) > 1){ //TODO: improve API validation and remove
      errorMessage = Object.keys(data).join(', ') + ' are required';
    }

    dispatch({
      type: AUTH_ERROR,
      payload: errorMessage
    });
  }
};

export const signin = (formProps, callback) => async (dispatch) => {
  try{
    const response = await axios.post(ROOT_URL + '/users/signin', formProps);

    dispatch({type: AUTH_USER, payload: response.data.token});
    localStorage.setItem('token', response.data.token);
    callback();
  } catch ({response: {data: {error}}}) { //TODO: refactor to errorMessage in API and set standard for error handling
    dispatch({
      type: AUTH_ERROR,
      payload: error
    });
  }
};

export const signout = () => {
  localStorage.removeItem('token');

  return {
    type: AUTH_USER,
    payload: ''
  };
};
