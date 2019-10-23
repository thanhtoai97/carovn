/* eslint-disable camelcase */
import userService from '../service/index';

// import axios from 'axios';
import * as ActionsTypes from '../constants/actionsType';

/*
const apiURL = 'http://localhost:3002/users';
const client = axios.create({
  baseURL: apiURL,
  headers: {
    'Content-Type': 'application/json'
  },
});

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
    client
      .post('/register', { name, email, password })
      .then(response => {
        dispatch(register_Success(response.data));
      })
      .catch(error => {
        dispatch(register_Error(error));
      });
  };
};
*/

const register_Success = (name, email, password) => ({
  type: ActionsTypes.AUTH_REGISTER_SUCCESS,
  name,
  email,
  password
});

const register_Pending = (name, email, password) => ({
  type: ActionsTypes.AUTH_REGISTER_PENDING,
  name,
  email,
  password
});

const register_Error = error => ({
  type: ActionsTypes.AUTH_REGISTER_ERROR,
  error
});

export const registerAsync = (name, email, password) => {
  return dispatch => {
    dispatch(register_Pending(name, email, password));

    userService.register(name, email, password).then(
      () => {
        dispatch(register_Success());
      },
      error => {
        dispatch(register_Error(error.toString()));
      }
    );
  };
};

export default registerAsync;
