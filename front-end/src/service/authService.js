import axios from 'axios';
import { push } from 'connected-react-router';
import { loginSuccess, loginFailure, logoutSuccess } from '../actions/authAction';
import { API_URL, JWT_TOKEN } from '../config/config';
import { setLocalStorage, clearLocalStorage } from '../utils/storageUtil';

export const login = ({ username, password }) => {
  return (dispatch) => {
    axios
      .post('/login', { username, password })
      .then((response) => {
        console.log(response);
        dispatch(loginSuccess(response.data.message));
        setLocalStorage(JWT_TOKEN, response.data.message);
        dispatch(push('/'));
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        dispatch(loginFailure(error.message));
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    axios
      .post('/logout', {})
      .then((response) => {
        clearLocalStorage(JWT_TOKEN);
        dispatch(logoutSuccess());
        dispatch(push('/'));
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
    return false;
  };
};