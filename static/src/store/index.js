import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import auth from './auth/reducer';
import meals from './meals/reducer';
import calendarItems from './calendar/reducer';

const rootReducer = combineReducers({
  auth,
  meals,
  calendarItems,
  form: formReducer
});

export default rootReducer;
