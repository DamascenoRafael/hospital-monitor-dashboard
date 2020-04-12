import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import mqtt from 'mqtt';

import Routes from './routes';
import { sensorDataReceived } from './actions';
import settings from './settings';

import './global.css';

const App = ({ sensorDataReceived }) => {
  useEffect(() => {
    const client = mqtt.connect(settings.BROKER_URL);

    client.on('connect', function () {
      settings.HOSPITAL_BEDS.forEach((hospital_bed) => {
        const sensorId = hospital_bed.sensor_id;
        client.subscribe(`oximetroiot/${sensorId}`, function (err) {
          console.log(`subscribing to oximetroiot/${sensorId}....`);
          if (err) {
            console.log(`error subscribing to oximetroiot/${sensorId}....`);
            console.log(err);
          }
        });
      });
    });

    client.on('message', function (topic, message) {
      const sensorId = topic.split('/').pop();
      const { beat, spo2, temp } = JSON.parse(message.toString());
      const timestamp = Date.now();
      const sensorData = { beat, spo2, temp, timestamp };
      sensorDataReceived({ sensorId, sensorData });
    });
  });

  return <Routes />;
};

export default connect(null, { sensorDataReceived })(App);
