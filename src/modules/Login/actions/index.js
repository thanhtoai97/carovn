/* eslint-disable camelcase */
import axios from 'axios';
import * as ActionsTypes from '../constants/actionsType';

const apiURL = 'http://localhost:3002/users';
const client = axios.create({
  baseURL: apiURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

const login_Success = loggedInUser => ({
  type: ActionsTypes.AUTH_LOGIN_SUCCESS,
  loggedInUser
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
        dispatch(login_Success(response.data));
        localStorage.setItem('loggedInUser', JSON.stringify(response.data));
      })
      .catch(error => {
        dispatch(login_Error(error));
      });
  };
};

export default loginAsync;
