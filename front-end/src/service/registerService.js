import axios from 'axios';
import { push } from 'connected-react-router';

import { registerSuccess, registerFailure } from '../actions/registerAction';
import { API_URL, JWT_TOKEN } from '../config/config';
import { setLocalStorage, clearLocalStorage } from '../utils/storageUtil';

export const register = ({ username, password, realname, unit, pro }) => {
  return (dispatch) => {
    axios
      .post('/register', { username, password, realname, unit, pro })
      .then((response) => {
        console.log(response);
        dispatch(registerSuccess(response.data.token));
        dispatch(push('/login'));
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        dispatch(registerFailure(error.message));
      });
  };
};