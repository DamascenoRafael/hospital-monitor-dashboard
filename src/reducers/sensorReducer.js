import RecordsQueue from '../helpers/RecordsQueue';
import settings from 'settings';

const emptySensorData = {
  beat: '--',
  spo2: '--',
  temp: '--',
  timestamp: '--',
};

const loadInitialData = (hospitalBeds) => {
  const state = {};
  hospitalBeds.forEach((hospitalBed) => {
    const sensorId = hospitalBed.sensorId;
    const recordsQueue = new RecordsQueue(settings.RECORDS_TO_SAVE, `sensor-${sensorId}`);
    recordsQueue.loadLocal();
    if (recordsQueue.isEmpty()) {
      recordsQueue.add(emptySensorData);
    }
    state[sensorId] = recordsQueue.queue;
  });
  return state;
};

export default (state = {}, action) => {
  switch (action.type) {
    case 'SENSOR_DATA_RECEIVED':
      const { sensorId, sensorData } = action.payload;
      const recordsQueue = new RecordsQueue(settings.RECORDS_TO_SAVE, `sensor-${sensorId}`);
      recordsQueue.loadLocal();
      recordsQueue.add(sensorData);
      recordsQueue.saveLocal();
      const newRecords = {};
      newRecords[sensorId] = recordsQueue.queue;
      return { ...state, ...newRecords };
    case 'HOSPITAL_BEDS_UPDATED':
      return loadInitialData(action.payload);
    default:
      return state;
  }
};
