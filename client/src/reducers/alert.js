import { SET_ALERTS } from '../actions/types';

// Alert reducer
// Takes in an array of alerts and dispatches to store

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERTS:
      return payload;
    default:
      return state;
  }
}
