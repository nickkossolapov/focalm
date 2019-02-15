// Quack! This is a duck. https://github.com/erikras/ducks-modular-redux

const ENABLE_SELECTING = 'focalm/selections/enable_selecting';
const SELECT_FIRST_DATE = 'focalm/selections/select_first_date';
const SELECT_SECOND_DATE = 'focalm/selections/select_second_date';
const CLEAR_SELECTION = 'focalm/selections/clear_selection';
const CANCEL_SELECTION = 'focalm/selections/cancel_selection';


const INITIAL_STATE = {
  isSelecting: false,
  doneSelecting: false,
  initialSelectedDateId: null,
  selectedStartDateId: null,
  selectedEndDateId: null,
};

export default function reducer(state = INITIAL_STATE, action) {
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
        doneSelecting: true,
      };

    case CLEAR_SELECTION:
      return {
        selectedStartDateId: null,
        selectedEndDateId: null,
        initialSelectedDateId: null,
        isSelecting: true,
        doneSelecting: false,
      };

    case CANCEL_SELECTION:
      return {
        selectedStartDateId: null,
        selectedEndDateId: null,
        initialSelectedDateId: null,
        isSelecting: false,
        doneSelecting: false,
      };

    default:
      return state;
  }
};


export const startSelecting = () => (dispatch) => {
  dispatch({
    type: ENABLE_SELECTING,
  })
};

export const selectDate = (dateId) => (dispatch, getState) => {
  const {selections: {initialSelectedDateId}} = getState();

  if (!initialSelectedDateId) {
    dispatch({
      type: SELECT_FIRST_DATE,
      payload: dateId,
    });
  } else {
    dispatch({
      type: SELECT_SECOND_DATE,
      payload: dateId,
    })
  }
};

export const clearSelection = () => (dispatch) => {
  dispatch({
    type: CLEAR_SELECTION,
  })
};

export const cancelSelection = () => (dispatch) => {
  dispatch({
    type: CANCEL_SELECTION,
  })
};