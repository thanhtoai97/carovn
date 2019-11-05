import * as ActionTypes from '../constants/actionsType';

const defaultState = {
  user: null,
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
        user: action.user,
        loading: true,
        error: null
      };
    case ActionTypes.AUTH_LOGIN_ERROR:
      return {
        ...state,
        user: null,
        error: action.error,
        loading: false
      };
    default:
      return state;
  }
};

export default authReducerLogin;
