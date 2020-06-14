import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { mapKeys, camelCase } from 'lodash';
import mqtt from 'mqtt';

import Routes from './routes';
import { hospitalBedsUpdated, sensorDataReceived } from './actions';
import settings from 'settings';

import handleBrokerConnect from './helpers/handleBrokerConnect';
import handleBrokerMessage from './helpers/handleBrokerMessage';

import './global.css';

const App = ({ hospitalBedsUpdated, sensorDataReceived }) => {
  const hospitalBeds = settings.HOSPITAL_BEDS.map((hospitalBed) =>
    mapKeys(hospitalBed, (_value, key) => camelCase(key))
  );
  hospitalBedsUpdated(hospitalBeds);

  useEffect(() => {
    const client = mqtt.connect(settings.BROKER_URL);

    client.on('connect', () => {
      handleBrokerConnect(client, hospitalBeds);
    });

    client.on('message', (topic, message) => {
      handleBrokerMessage(topic, message, sensorDataReceived);
    });
  });

  return <Routes />;
};

export default connect(null, { hospitalBedsUpdated, sensorDataReceived })(App);
