import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import auth from './auth/reducer';
import meals from './meals/reducer';
import meal from './meal/reducer';

const rootReducer = combineReducers({
  auth,
  meals,
  currentMeal: meal,
  form: formReducer
});

export default rootReducer;
