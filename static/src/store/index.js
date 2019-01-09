import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import auth from './auth/reducer';
import meals from './meals/reducer';
import calendarItems from './calendar/reducer';
import selections from './selections/reducer';

const rootReducer = combineReducers({
  auth,
  meals,
  calendarItems,
  selections,
  form: formReducer
});

export default rootReducer;
