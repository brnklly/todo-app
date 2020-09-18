import axios from 'axios';
import { SET_ALERTS } from './types';

/* 
User actions 

Register user - axios call to POST /api/users/register 
Login user - axios call to POST /api/users/login
Update user - axios call to PUT /api/users/
Delete user - axios call to DELETE /api/users/

*/

export const register = ({ name, email, password }) => async (dispatch) => {
  const body = JSON.stringify({ name, email, password });
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post('/api/users/register', body, config);
    // dispatch alerts and register actions
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
