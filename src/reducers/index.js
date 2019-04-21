import { combineReducers } from 'redux';
import AppReducer from './app-reducer';

const reducers = {
  store: AppReducer
}

const rootReducer = combineReducers(reducers);

export default rootReducer;