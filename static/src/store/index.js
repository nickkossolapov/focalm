import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import auth from './auth/reducer';
import meals from './meals/reducer';
import dayMealIds from './calendar/reducer';

const rootReducer = combineReducers({
  auth,
  meals,
  dayMealIds,
  form: formReducer
});

export default rootReducer;
