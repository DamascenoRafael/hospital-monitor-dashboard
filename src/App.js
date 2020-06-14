import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { mapKeys, camelCase } from 'lodash';
import mqtt from 'mqtt';

import Routes from './routes';
import displayToaster from './helpers/displayToaster';
import { hospitalBedsUpdated, sensorDataReceived } from './actions';
import settings from 'settings';

import './global.css';

const handleMessage = (topic, message, sensorDataReceived) => {
  const [baseTopic, sensorId] = topic.split('/');
  const timestamp = Date.now();
  switch (baseTopic) {
    case settings.ALERTS_TOPIC: {
      const { alertType } = JSON.parse(message.toString());
      const alertMessage = `Alerta tipo ${alertType}`;
      displayToaster(sensorId, alertType, alertMessage, timestamp);
      break;
    }
    case settings.OXIMETERS_TOPIC: {
      const { beat, spo2, temp } = JSON.parse(message.toString());
      const sensorData = { beat, spo2, temp, timestamp };
      sensorData.temp = temp.toFixed(1);
      sensorDataReceived({ sensorId, sensorData });
      break;
    }
    default: {
      break;
    }
  }
};

const App = ({ hospitalBedsUpdated, sensorDataReceived }) => {
  const hospitalBeds = settings.HOSPITAL_BEDS.map((hospitalBed) =>
    mapKeys(hospitalBed, (_value, key) => camelCase(key))
  );
  hospitalBedsUpdated(hospitalBeds);

  useEffect(() => {
    const client = mqtt.connect(settings.BROKER_URL);

    client.on('connect', function () {
      hospitalBeds.forEach((hospitalBed) => {
        const sensorId = hospitalBed.sensorId;
        const oximeterTopic = `${settings.OXIMETERS_TOPIC}/${sensorId}`;
        const alertTopic = `${settings.ALERTS_TOPIC}/${sensorId}`;
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
    });

    client.on('message', function (topic, message) {
      handleMessage(topic, message, sensorDataReceived);
    });
  });

  return <Routes />;
};

export default connect(null, { hospitalBedsUpdated, sensorDataReceived })(App);
