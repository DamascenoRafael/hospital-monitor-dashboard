import { combineReducers } from 'redux';
import sensorReducer from './sensorReducer';

export default combineReducers({
  sensors: sensorReducer,
});
