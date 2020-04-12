export const sensorDataReceived = (data) => {
  return {
    type: 'SENSOR_DATA_RECEIVED',
    payload: data,
  };
};
