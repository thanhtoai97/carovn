import * as ActionTypes from '../constants/actionsType';

const defaultState = {
  loggedInUser: null,
  loading: true,
  error: null
};

const authReducerLogin = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_LOGIN_PENDING:
      return {
        ...state,
        loading: true
      };
    case ActionTypes.AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        loggedInUser: action.loggedInUser,
        loading: true,
        error: null
      };
    case ActionTypes.AUTH_LOGIN_ERROR:
      return {
        ...state,
        loggedInUser: null,
        error: action.error,
        loading: false
      };
    default:
      return state;
  }
};

export default authReducerLogin;
