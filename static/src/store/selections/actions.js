import {
  CLEAR_SELECTION,
  ENABLE_SELECTING,
  SELECT_FIRST_DATE,
  SELECT_SECOND_DATE,
} from './types';

export const startSelecting = () => (dispatch) => {
  dispatch({
    type: ENABLE_SELECTING
  })
};

export const selectDate = (dateId) => (dispatch, getState) => {
  const { selections: {initialSelectedDateId} } = getState();

  if (!initialSelectedDateId) {
    dispatch({
      type: SELECT_FIRST_DATE,
      payload: dateId
    });
  } else {
    dispatch({
      type: SELECT_SECOND_DATE,
      payload: dateId
    })
  }
};

export const clearSelection = () => (dispatch) => {
  dispatch({
    type: CLEAR_SELECTION
  })
};