import { combineReducers } from 'redux';
import hospitalBedReducer from './hospitalBedReducer';
import sensorReducer from './sensorReducer';
import reportReducer from './reportReducer';

export default combineReducers({
  hospitalBeds: hospitalBedReducer,
  sensors: sensorReducer,
  reports: reportReducer,
});
