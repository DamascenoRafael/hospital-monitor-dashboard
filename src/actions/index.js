export const sensorDataReceived = (data) => {
  return {
    type: 'SENSOR_DATA_RECEIVED',
    payload: data,
  };
};

export const sensorCheckData = (data) => {
  return {
    type: 'SENSOR_DATA_CHECK',
    payload: data,
  };
};

export const deleteSensorData = (data) => {
  return {
    type: 'DELETE_SENSOR_DATA',
    payload: data,
  };
};

export const hospitalBedsUpdated = (data) => {
  return {
    type: 'HOSPITAL_BEDS_UPDATED',
    payload: data,
  };
};
