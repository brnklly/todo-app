import axios from 'axios';
import { setAlerts } from './alert';
import { GET_LIST, GET_USER_LISTS, SET_ALERTS } from './types';

// List action creator

// get current user's lists
export const getUserLists = () => async (dispatch) => {
  // axios call to /api/lists/
  try {
    const res = await axios.get('/api/lists/');
    dispatch({
      type: GET_USER_LISTS,
      payload: res.data,
    });
    dispatch(setAlerts([]));
  } catch (error) {
    const alerts = error.response.data.alerts;
    if (alerts) {
      alerts.forEach((alert) => (alert.alertType = 'fail'));
      // dispatch alerts
      dispatch({
        type: SET_ALERTS,
        payload: alerts,
      });
    }
  }
};

// get a single list
export const getList = (id) => async (dispatch) => {
  try {
    // axios call to get /api/lists/:id
    const res = await axios.get(`/api/lists/${id}`);
    dispatch({
      type: GET_LIST,
      payload: res.data,
    });
    dispatch(setAlerts([]));
  } catch (error) {
    const alerts = error.response.data.alerts;
    if (alerts) {
      alerts.forEach((alert) => (alert.alertType = 'fail'));
      // dispatch alerts
      dispatch({
        type: SET_ALERTS,
        payload: alerts,
      });
    }
  }
};

// add a list
export const addList = ({ name }) => async (dispatch) => {
  const body = JSON.stringify({ name });
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    // send axios request to lists routes
    await axios.post('/api/lists/', body, config);
    // remove any error alerts
    dispatch(setAlerts([]));
    dispatch(getUserLists());
    return true;
  } catch (error) {
    const alerts = error.response.data.alerts;
    if (alerts) {
      alerts.forEach((alert) => (alert.alertType = 'fail'));
      // dispatch alerts
      dispatch({
        type: SET_ALERTS,
        payload: alerts,
      });
    }
  }
};

// update list
export const updateList = ({ id, name, moveCompleted, prioritize }) => async (
  dispatch
) => {
  // axios call to PUT /api/lists/:id
  const body = JSON.stringify({ name, moveCompleted, prioritize });
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.put(`/api/lists/${id}`, body, config);
    dispatch({
      type: GET_LIST,
      payload: res.data,
    });
    dispatch(setAlerts([]));
  } catch (error) {
    const alerts = error.response.data.alerts;
    if (alerts) {
      alerts.forEach((alert) => (alert.alertType = 'fail'));
      // dispatch alerts
      dispatch({
        type: SET_ALERTS,
        payload: alerts,
      });
    }
  }
};

// remove a list
export const removeList = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/lists/${id}`);
    // remove any error alerts
    dispatch(setAlerts([]));
    dispatch(getUserLists());
  } catch (error) {
    const alerts = error.response.data.alerts;
    if (alerts) {
      alerts.forEach((alert) => (alert.alertType = 'fail'));
      // dispatch alerts
      dispatch({
        type: SET_ALERTS,
        payload: alerts,
      });
    }
  }
};
