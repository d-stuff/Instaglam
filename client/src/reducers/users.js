import {
  SEARCH_USERS_SUCCESS,
  SEARCH_USERS_FAIL,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_FAIL
} from 'actions/types';

const initialState = {
  loading: true,
  users: [],
  user: {},
  error: ''
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SEARCH_USERS_SUCCESS:
      return {
        ...state,
        users: payload,
        loading: false,
        error: ''
      };
    case SEARCH_USERS_FAIL:
      return {
        ...state,
        users: [],
        loading: false,
        error: payload
      };
    case SEARCH_USER_SUCCESS:
      return {
        ...state,
        user: payload,
        loading: false,
        error: ''
      };
    case SEARCH_USER_FAIL:
      return {
        ...state,
        user: {},
        loading: false,
        error: payload
      };

    default:
      return state;
  }
}
