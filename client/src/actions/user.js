import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { LOGIN_USER, SET_ALERTS, LOGOUT_USER, USER_LOADED } from './types';

/* 
User actions 

Register user - axios call to POST /api/users/register 
Login user - axios call to POST /api/users/login
Update user - axios call to PUT /api/users/
Delete user - axios call to DELETE /api/users/

*/

// Load user for authorized pages
export const loadUser = () => async (dispatch) => {
  // if local storage contains token, set token to headers
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    // send get request to server side
    const res = await axios.get('/api/users/');
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    // reset user state with LOGOUT USER
    dispatch({
      type: LOGOUT_USER,
    });
  }
};

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

export const login = ({ email, password }) => async (dispatch) => {
  const body = JSON.stringify({ email, password });
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post('/api/users/login', body, config);
    // dispatch login action
    dispatch({
      type: LOGIN_USER,
      payload: res.data,
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
