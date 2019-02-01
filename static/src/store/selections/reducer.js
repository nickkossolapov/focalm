import {CANCEL_SELECTION, CLEAR_SELECTION, ENABLE_SELECTING, SELECT_FIRST_DATE, SELECT_SECOND_DATE} from './types';

const initialState = {
  isSelecting: false,
  doneSelecting: false,
  initialSelectedDateId: null,
  selectedStartDateId: null,
  selectedEndDateId: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ENABLE_SELECTING:
      return {...state, isSelecting: true};

    case SELECT_FIRST_DATE:
      return {...state, initialSelectedDateId: action.payload};

    case SELECT_SECOND_DATE:
      let dates = [state.initialSelectedDateId, action.payload];
      return {
        selectedStartDateId: Math.min(...dates),
        selectedEndDateId: Math.max(...dates),
        initialSelectedDateId: null,
        isSelecting: false,
        doneSelecting: true
      };

    case CLEAR_SELECTION:
      return {
        selectedStartDateId: null,
        selectedEndDateId: null,
        initialSelectedDateId: null,
        isSelecting: true,
        doneSelecting: false
      };

    case CANCEL_SELECTION:
      return {
        selectedStartDateId: null,
        selectedEndDateId: null,
        initialSelectedDateId: null,
        isSelecting: false,
        doneSelecting: false
      };

    default:
      return state;
  }
}