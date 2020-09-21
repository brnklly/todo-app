import axios from 'axios';
import { SET_ALERTS } from './types';

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
