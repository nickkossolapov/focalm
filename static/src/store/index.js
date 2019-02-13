import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import auth from './auth';
import meals from './meals';
import calendarItems from './calendar';
import selections from './selections';

const rootReducer = combineReducers({
  auth,
  meals,
  calendarItems,
  selections,
  form: formReducer
});

export default rootReducer;
