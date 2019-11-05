import * as ActionTypes from '../constants/actionsType';

const defaultState = {
  registering: true
};

const authReducerRegister = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_REGISTER_PENDING:
      return {
        ...state
      };
    case ActionTypes.AUTH_REGISTER_SUCCESS:
      return {
        ...state
      };
    case ActionTypes.AUTH_REGISTER_ERROR:
      return {
        ...state
      };
    default:
      return state;
  }
};

export default authReducerRegister;
