import axios from 'axios';
import { SET_ALERT } from 'actions/alerts/alertTypes';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTHENTICATED_USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from './authTypes';

export const register = ({ fullName, email, username, password }) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = {
    fullName,
    email,
    username,
    password
  };

  try {
    const res = await axios.post('/api/register', body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    const { errors } = error.response.data;

    if (errors) {
      dispatch({
        type: SET_ALERT,
        payload: {
          message: errors,
          alertType: 'Error'
        }
      });
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

export const login = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = { email, password };

  try {
    const res = await axios.post('/api/login', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    const { errors } = error.response.data;

    if (errors) {
      dispatch({
        type: SET_ALERT,
        payload: {
          message: errors,
          alertType: 'Error'
        }
      });
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.post('/api/logout');
    dispatch({ type: LOGOUT });
  } catch (error) {
    console.error(error);
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/me');

    dispatch({
      type: AUTHENTICATED_USER_LOADED,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const uploadProfilePic = (selectedFile) => async dispatch => {
  try {
    const fd = new FormData();
    fd.append('profilePic', selectedFile);
    await axios.post('/api/me/profilePic', fd);
    dispatch(loadUser());
    window.location.reload();
  } catch (error) {
    console.log(error.message);
  }
};

export const removeProfilePic = () => async dispatch => {
  try {
    await axios.delete('/api/me/profilePic');
    dispatch(loadUser());
    window.location.reload();
  } catch (error) {
    console.log(error.message);
  }
};
