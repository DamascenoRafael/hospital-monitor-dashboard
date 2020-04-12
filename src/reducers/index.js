import { combineReducers } from 'redux';
import sensorDataReceivedReducer from './sensorDataReceivedReducer';

export default combineReducers({
  sensors: sensorDataReceivedReducer,
});
