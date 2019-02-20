// Quack! This is a duck. https://github.com/erikras/ducks-modular-redux

import axios from 'axios';
import _ from 'lodash';
import {ERROR_TYPES} from './constants/error_types';

const AUTH_USER = 'focalm/auth/auth_user';
const VALIDATION_ERROR = 'focalm/auth/validation_error';
const CREDENTIALS_ERROR = 'focalm/auth/credentials_error';
const USER_EXISTS_ERROR = 'focalm/auth/user_exists_error';
const AUTH_ERROR = 'focalm/auth/auth_error';
const CLEAR_ERROR = 'focalm/auth/clear_error';
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
    case CREDENTIALS_ERROR:
      return {...state, credentialsError: action.payload};
    case VALIDATION_ERROR:
      return {...state, validationError: action.payload};
    case USER_EXISTS_ERROR:
      return {...state, userExistsError: action.payload};
    case AUTH_ERROR:
      return {...state, authError: action.payload};
    case CLEAR_ERROR:
      return {...state, errorMessage: '', validationError: '', credentialsError: '', userExistsError: ''};
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
    dispatch({type: CLEAR_ERROR});

    callback();
  } catch ({response: {data}}) {
    dispatchErrorTypes(data, dispatch);
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

    dispatch({
      type: AUTH_USER,
      payload: response.data.token
    });

    localStorage.setItem('token', response.data.token);
    dispatch({type: CLEAR_ERROR});

    callback();
  } catch ({response: {data}}) {
    dispatchErrorTypes(data, dispatch);
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

export const clearErrors = () => {
    return {type: CLEAR_ERROR};
};

const dispatchErrorTypes = (data, dispatch) => {
  if (data[ERROR_TYPES.CREDENTIALS_ERROR]){
    dispatch({
      type: CREDENTIALS_ERROR,
      payload: data[ERROR_TYPES.CREDENTIALS_ERROR]
    })
  } else if (data[ERROR_TYPES.VALIDATION_ERROR]){
    dispatch({
      type: VALIDATION_ERROR,
      payload: data[ERROR_TYPES.VALIDATION_ERROR]
    })
  } else if (data[ERROR_TYPES.USER_EXISTS_ERROR]){
    dispatch({
      type: USER_EXISTS_ERROR,
      payload: data[ERROR_TYPES.USER_EXISTS_ERROR]
    })
  }else {
    dispatch({
      type: AUTH_ERROR,
      payload: "Something went wrong, please try again"
    })
  }
};
