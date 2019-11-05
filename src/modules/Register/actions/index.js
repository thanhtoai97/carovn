/* eslint-disable camelcase */
import axios from 'axios';

import * as ActionsTypes from '../constants/actionsType';

const apiURL = 'http://localhost:5000/users/';
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

const register_Success = () => ({
  type: ActionsTypes.AUTH_REGISTER_SUCCESS
});

const register_Pending = () => ({
  type: ActionsTypes.AUTH_REGISTER_PENDING
});

const register_Error = error => ({
  type: ActionsTypes.AUTH_REGISTER_ERROR,
  error
});

export const registerAsync = (name, email, password) => {
  return dispatch => {
    dispatch(register_Pending());
    axios
      .post(`${apiURL}register`, { name, email, password }, { headers })
      .then(response => {
        dispatch(register_Success(response.data));
        localStorage.setItem('u_code', JSON.stringify(response.message));
        localStorage.setItem('is_done', true);
        window.location.href = '/#login';
      })
      .catch(error => {
        dispatch(register_Error(error));
        window.location.href = '/#register';
      });
  };
};

export default registerAsync;
