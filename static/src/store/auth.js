// Quack! This is a duck. https://github.com/erikras/ducks-modular-redux

import axios from 'axios';
import _ from 'lodash';

const AUTH_USER = 'focalm/auth/auth_user';
const AUTH_ERROR = 'focalm/auth/auth_error';
const LOADING = 'focalm/auth/loading';

const INITIAL_STATE = {
  authenticated: '',
  errorMessage: '',
  loading: false,
};


export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      return {...state, authenticated: action.payload};
    case AUTH_ERROR:
      return {...state, errorMessage: action.payload};
    case LOADING:
      return {...state, loading: action.payload};
    default:
      return state;
  }
}


const ROOT_URL = process.env.API_URL;

export const signup = (formProps, callback) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING,
      payload: true,
    });

    const response = await axios.post(ROOT_URL + '/users/signup', formProps);

    dispatch({
      type: AUTH_USER,
      payload: response.data.token,
    });
    localStorage.setItem('token', response.data.token);
    callback();
  } catch ({response: {data}}) {
    let errorMessage;

    if (data['error']) {
      errorMessage = data['error'];
    } else if (_.size(data) > 1) { //TODO: improve API validation and remove
      errorMessage = Object.keys(data).join(', ') + ' are required';
    }

    dispatch({
      type: AUTH_ERROR,
      payload: errorMessage,
    });
  } finally {
    dispatch({
      type: LOADING,
      payload: false,
    });
  }
};

export const signin = (formProps, callback) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING,
      payload: true,
    });

    const response = await axios.post(ROOT_URL + '/users/signin', formProps);

    dispatch({type: AUTH_USER, payload: response.data.token});
    localStorage.setItem('token', response.data.token);
    callback();
  } catch ({response: {data: {error}}}) { //TODO: refactor to errorMessage in API and set standard for error handling
    dispatch({
      type: AUTH_ERROR,
      payload: error,
    });
  } finally {
    dispatch({
      type: LOADING,
      payload: false,
    });
  }
};

export const signout = () => {
  localStorage.removeItem('token');

  return {
    type: AUTH_USER,
    payload: '',
  };
};
