import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import auth from './auth/reducer';
import meals from './meals/reducer';

const rootReducer = combineReducers({
  auth,
  meals,
  form: formReducer
});

export default rootReducer;
