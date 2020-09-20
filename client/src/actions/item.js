import axios from 'axios';
import { setAlerts } from './alert';
import { getList } from './list';
import { SET_ALERTS } from './types';

// Item action creator

// create an item
export const addItem = ({ name, priority, list }) => async (dispatch) => {
  const body = JSON.stringify({ name, priority });
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(`/api/items/list/${list}`, body, config);
    dispatch(getList(res.data.list));
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

// update an item
export const updateItem = ({ id, name, completed, priority }) => async (
  dispatch
) => {
  // make axios call to update item
  const body = JSON.stringify({ id, name, completed, priority });
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.put(`/api/items/${id}`, body, config);
    // dispatch call to reset list and items
    dispatch(getList(res.data.list));
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

// remove an item
export const removeItem = (id, list) => async (dispatch) => {
  // make axios call to remove item
  try {
    await axios.delete(`/api/items/${id}`);
    // remove any error alerts
    dispatch(setAlerts([]));
    dispatch(getList(list));
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
