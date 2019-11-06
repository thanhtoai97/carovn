/* eslint-disable camelcase */
import axios from 'axios';
import * as ActionsTypes from '../constants/actionsType';

const apiURL = 'https://servercarovn.herokuapp.com/users';
const client = axios.create({
  baseURL: apiURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

const login_Success = user => ({
  type: ActionsTypes.AUTH_LOGIN_SUCCESS,
  user
});

const login_Pending = () => ({
  type: ActionsTypes.AUTH_LOGIN_PENDING
});

const login_Error = error => ({
  type: ActionsTypes.AUTH_LOGIN_ERROR,
  error
});

export const loginAsync = (email, password) => {
  return dispatch => {
    dispatch(login_Pending());
    client
      .post('/login', { email, password })
      .then(response => {
        localStorage.setItem('user', JSON.stringify(email, password));
        dispatch(login_Success(response.data.user));
      })
      .catch(error => {
        dispatch(login_Error(error));
        window.location.href = '/';
      });
  };
};

export default loginAsync;
