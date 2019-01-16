import {AUTH_USER, AUTH_ERROR, LOADING} from './types';

const INITIAL_STATE = {
  authenticated: '',
  errorMessage: '',
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type){
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
