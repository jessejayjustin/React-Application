import { combineReducers } from 'redux';
import AppReducer from './appReducer';

const reducers = {
  store: AppReducer
}

const rootReducer = combineReducers(reducers);

export default rootReducer;