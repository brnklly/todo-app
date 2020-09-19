import { LOGIN_USER, LOGOUT_USER, USER_LOADED } from '../actions/types';

// User reducer

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
      };
    case LOGIN_USER:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        isAuthenticated: true,
      };
    case LOGOUT_USER:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
}
