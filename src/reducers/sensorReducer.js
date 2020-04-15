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
    state[sensorId] = {
      data: recordsQueue.queue,
      expired: 0,
    };
  });
  return state;
};

export default (state = {}, action) => {
  switch (action.type) {
    case 'SENSOR_DATA_RECEIVED': {
      const { sensorId, sensorData } = action.payload;
      const recordsQueue = new RecordsQueue(settings.RECORDS_TO_SAVE, `sensor-${sensorId}`);
      recordsQueue.loadLocal();
      recordsQueue.add(sensorData);
      recordsQueue.saveLocal();
      state[sensorId].data = recordsQueue.queue;
      state[sensorId].expired = 0;
      return { ...state };
    }
    case 'SENSOR_DATA_CHECK': {
      const expireAfterTime = action.payload;
      let hasExpired = 0;
      Object.keys(state).forEach((sensorId) => {
        const now = Date.now();
        const records = state[sensorId].data;
        const lastRecordTimestamp = records[records.length - 1].timestamp;
        if (now - lastRecordTimestamp >= expireAfterTime) {
          hasExpired = 1;
          state[sensorId].expired = 1;
        }
      });
      return hasExpired ? { ...state } : state;
    }
    case 'HOSPITAL_BEDS_UPDATED': {
      return loadInitialData(action.payload);
    }
    default:
      return state;
  }
};
