import { combineReducers } from 'redux';
import { gameReducer } from './gameReducer';
import authReducerLogin from '../modules/Login/reducers/index';
import authReducerRegister from '../modules/Register/reducers/index';

const allReducers = combineReducers({
  game: gameReducer,
  authReducerLogin,
  authReducerRegister
});

export default allReducers;
