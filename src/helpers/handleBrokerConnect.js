import store from '../store';
import { OXIMETERS_TOPIC, ALERTS_TOPIC } from 'settings';

const handleBrokerConnect = (client) => {
  const state = store.getState();

  state.hospitalBeds.forEach((hospitalBed) => {
    const sensorId = hospitalBed.sensorId;
    const oximeterTopic = `${OXIMETERS_TOPIC}/${sensorId}`;
    const alertTopic = `${ALERTS_TOPIC}/${sensorId}`;
    client.subscribe(oximeterTopic, function (err) {
      console.log(`subscribing to ${oximeterTopic}...`);
      if (err) {
        console.log(`error subscribing to ${oximeterTopic}...`);
        console.log(err);
      }
    });
    client.subscribe(alertTopic, function (err) {
      console.log(`subscribing to ${alertTopic}...`);
      if (err) {
        console.log(`error subscribing to ${alertTopic}...`);
        console.log(err);
      }
    });
  });
};

export default handleBrokerConnect;
