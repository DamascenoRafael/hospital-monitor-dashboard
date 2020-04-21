import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { mapKeys, camelCase } from 'lodash';
import mqtt from 'mqtt';

import Routes from './routes';
import AlertToaster from './components/AlertToaster';
import { hospitalBedsUpdated, sensorDataReceived } from './actions';
import toaster from 'toasted-notes';
import settings from 'settings';

import './global.css';

const handleMessage = (topic, message, sensorDataReceived) => {
  const [baseTopic, sensorId] = topic.split('/');
  switch (baseTopic) {
    case 'alertiot': {
      const { alertType } = JSON.parse(message.toString());
      toaster.notify(
        ({ onClose }) => <AlertToaster hospitalBedId={sensorId} alertType={alertType} onClose={onClose} />,
        {
          position: 'bottom-right',
          duration: null,
        }
      );
      break;
    }
    case 'oximetroiot': {
      const sensorId = topic.split('/').pop();
      const { beat, spo2, temp } = JSON.parse(message.toString());
      const timestamp = Date.now();
      const sensorData = { beat, spo2, temp, timestamp };
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
        client.subscribe(`oximetroiot/${sensorId}`, function (err) {
          console.log(`subscribing to oximetroiot/${sensorId}....`);
          if (err) {
            console.log(`error subscribing to oximetroiot/${sensorId}....`);
            console.log(err);
          }
        });
        client.subscribe(`alertiot/${sensorId}`, function (err) {
          console.log(`subscribing to alertiot/${sensorId}....`);
          if (err) {
            console.log(`error subscribing to alertiot/${sensorId}....`);
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
