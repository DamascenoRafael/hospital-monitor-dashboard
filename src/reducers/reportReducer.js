import RecordsQueue from '../helpers/RecordsQueue';
import emptySensorData from '../helpers/emptySensorData';
import settings from 'settings';

const reportKeyPrefix = 'report-sensor-';
const reportLength = (24 * 60) / settings.REPORT_INTERVAL_MINUTES;

const loadInitialData = (ids) => {
  const state = {};
  ids.forEach((sensorId) => {
    const reportQueue = new RecordsQueue(reportLength, reportKeyPrefix + sensorId);
    reportQueue.loadLocal();
    if (reportQueue.isEmpty()) {
      reportQueue.add(emptySensorData);
    }
    state[sensorId] = {
      data: reportQueue.queue,
    };
  });
  return state;
};

const getInterval = (date) => {
  const dateMinutes = date.getHours() * 60 + date.getMinutes();
  return Math.floor(dateMinutes / settings.REPORT_INTERVAL_MINUTES);
};

const isSameInterval = (timestampA, timestampB) => {
  const dateTimestampA = new Date(timestampA);
  const dateTimestampB = new Date(timestampB);
  if (dateTimestampA.toDateString() !== dateTimestampB.toDateString()) {
    return false;
  }
  return getInterval(dateTimestampA) === getInterval(dateTimestampB);
};

export default (state = {}, action) => {
  switch (action.type) {
    case 'SENSOR_DATA_RECEIVED': {
      const { sensorId, sensorData } = action.payload;
      const reportQueue = new RecordsQueue(reportLength, reportKeyPrefix + sensorId);
      reportQueue.loadLocal();
      const lastReport = reportQueue.getLast();
      if (lastReport && isSameInterval(sensorData.timestamp, lastReport.timestamp)) {
        return state;
      }

      reportQueue.add(sensorData);
      reportQueue.saveLocal();
      state[sensorId].data = reportQueue.queue;
      return { ...state };
    }
    case 'DELETE_SENSOR_DATA': {
      const sensorId = action.payload;
      localStorage.removeItem(reportKeyPrefix + sensorId);
      const emptyData = loadInitialData([action.payload]);
      return { ...state, ...emptyData };
    }
    case 'HOSPITAL_BEDS_UPDATED': {
      return loadInitialData(action.payload.map((hospitalBed) => hospitalBed.sensorId));
    }
    default: {
      return state;
    }
  }
};
