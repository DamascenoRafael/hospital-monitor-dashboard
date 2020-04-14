import { combineReducers } from 'redux';
import hospitalBedReducer from './hospitalBedReducer';
import sensorReducer from './sensorReducer';

export default combineReducers({
  hospitalBeds: hospitalBedReducer,
  sensors: sensorReducer,
});
