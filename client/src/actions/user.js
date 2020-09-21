import axios from 'axios';
import { setAlerts } from './alert';
import { SET_ALERTS } from './types';
import setAuthToken from '../utils/setAuthToken';

/* 
User actions 

Update user - axios call to PUT /api/users/
Delete user - axios call to DELETE /api/users/

*/

// Update user info
export const updateUser = ({ name, email, password }) => async (dispatch) => {
  const body = JSON.stringify({ name, email, password });
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    // make axios call to PUT /api/users/
    const res = await axios.put('/api/users/', body, config);
    dispatch({
      type: SET_ALERTS,
      payload: res.data.alerts,
    });
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

// delete user account
export const deleteUser = ({ password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    console.log('before axios');
    const res = await axios.delete('/api/users/', {
      data: { password: password },
    });
    console.log('after axios');
    setAuthToken();
    dispatch(setAlerts(res.data.alerts));
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
