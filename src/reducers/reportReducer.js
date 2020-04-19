import RecordsQueue from '../helpers/RecordsQueue';
import emptySensorData from '../helpers/emptySensorData';
import settings from 'settings';

const reportKeyPrefix = 'report-sensor-';
const reportsPerDay = (24 * 60) / settings.REPORT_INTERVAL_MINUTES;

const loadInitialData = (ids) => {
  const state = {};
  ids.forEach((sensorId) => {
    const reportQueue = new RecordsQueue(reportsPerDay, reportKeyPrefix + sensorId);
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

const intervalOffsetPercentage = (sensorData) => {
  const date = new Date(sensorData.timestamp);
  const dateMinutes = date.getHours() * 60 + date.getMinutes();
  return (dateMinutes % settings.REPORT_INTERVAL_MINUTES) / settings.REPORT_INTERVAL_MINUTES;
};

const hasSameInterval = (sensorDataA, sensorDataB) => {
  if (!sensorDataA || !sensorDataB) {
    return false;
  }
  const dateTimestampA = new Date(sensorDataA.timestamp);
  const dateTimestampB = new Date(sensorDataB.timestamp);
  if (dateTimestampA.toDateString() !== dateTimestampB.toDateString()) {
    return false;
  }
  return getInterval(dateTimestampA) === getInterval(dateTimestampB);
};

export default (state = {}, action) => {
  switch (action.type) {
    case 'SENSOR_DATA_RECEIVED': {
      const { sensorId, sensorData } = action.payload;
      const reportQueue = new RecordsQueue(reportsPerDay, reportKeyPrefix + sensorId);
      reportQueue.loadLocal();
      const lastReport = reportQueue.getLast();
      if (intervalOffsetPercentage(sensorData) >= 0.5 || hasSameInterval(sensorData, lastReport)) {
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
