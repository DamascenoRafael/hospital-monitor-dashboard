import RecordsQueue from '../helpers/RecordsQueue';
import settings from '../settings';

const emptySensorData = {
  beat: '--',
  spo2: '--',
  temp: '--',
  timestamp: Date.now(),
};

const initialState = () => {
  const state = {};
  settings.HOSPITAL_BEDS.forEach((hospital_bed) => {
    const sensorId = hospital_bed.sensor_id;
    const recordsQueue = new RecordsQueue(settings.RECORDS_TO_SAVE, `sensor-${sensorId}`);
    recordsQueue.loadLocal();
    if (recordsQueue.isEmpty()) {
      recordsQueue.add(emptySensorData);
    }
    state[sensorId] = recordsQueue.queue;
  });
  return state;
};

export default (state = initialState(), action) => {
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
    default:
      return state;
  }
};
