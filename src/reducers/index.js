import { combineReducers } from 'redux';
import { gameReducer } from './gameReducer';
import settingsReducer from './settingReducer';
import authReducerLogin from '../modules/Login/reducers/index';
import authReducerRegister from '../modules/Register/reducers/index';

const allReducers = combineReducers({
  game: gameReducer,
  authReducerLogin,
  authReducerRegister,
  settings: settingsReducer
});

export default allReducers;
