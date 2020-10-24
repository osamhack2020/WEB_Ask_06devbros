import axios from 'axios';
import { push } from 'connected-react-router';

import { loginSuccess, loginFailure, logoutSuccess } from '../actions/authAction';
import { API_URL, JWT_TOKEN } from '../config/config';
import { setLocalStorage, clearLocalStorage } from '../utils/storageUtil';

export const login = ({ id, password }) => {
  return (dispatch) => {
    axios
      .post('/login', { id, password })
      .then((response) => {
        dispatch(loginSuccess(response.data.token));
        setLocalStorage(JWT_TOKEN, response.data.token);
        dispatch(push('/'));
      })
      .catch((error) => {
        console.log(error.message);
        dispatch(loginFailure(error.message));
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    clearLocalStorage(JWT_TOKEN);
    dispatch(logoutSuccess());
    dispatch(push('/'));
    return false;
  };
};