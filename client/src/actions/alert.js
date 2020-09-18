import { SET_ALERTS } from './types';

// Action creator for alert reducer

// Set alerts from the alerts array
export const setAlerts = (alerts) => (dispatch) => {
  dispatch({
    type: SET_ALERTS,
    payload: alerts,
  });
};
