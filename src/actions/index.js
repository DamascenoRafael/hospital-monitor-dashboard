import { mapKeys, camelCase } from 'lodash';

import { HOSPITAL_BEDS } from 'settings';
import { SENSOR_DATA_RECEIVED, SENSOR_DATA_CHECK, DELETE_SENSOR_DATA, UPDATE_HOSPITAL_BEDS } from './types';

export const sensorDataReceived = (data) => {
  return {
    type: SENSOR_DATA_RECEIVED,
    payload: data,
  };
};

export const sensorCheckData = (data) => {
  return {
    type: SENSOR_DATA_CHECK,
    payload: data,
  };
};

export const deleteSensorData = (data) => {
  return {
    type: DELETE_SENSOR_DATA,
    payload: data,
  };
};

export const updateHospitalBeds = () => {
  const hospitalBeds = HOSPITAL_BEDS.map((hospitalBed) => mapKeys(hospitalBed, (_value, key) => camelCase(key)));

  return {
    type: UPDATE_HOSPITAL_BEDS,
    payload: hospitalBeds,
  };
};
