import { GET_USER_LISTS, GET_LIST } from '../actions/types';

// List reducer

const initialState = {
  lists: [],
  list: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USER_LISTS:
      return {
        ...state,
        lists: payload,
        list: null,
        loading: false,
      };
    case GET_LIST:
      return {
        ...state,
        list: payload,
        loading: false,
      };
    default:
      return state;
  }
}
