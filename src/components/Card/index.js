import React, { useState, useEffect } from 'react';
import mqtt from 'mqtt';

import { FaHeartbeat } from 'react-icons/fa';
import { GiLungs } from 'react-icons/gi';
import { WiThermometer } from 'react-icons/wi';

import settings from '../../settings';

import './styles.css';

const Card = ({ name, route }) => {
  const [sensors, setSensors] = useState({
    beat: '--',
    spo2: '--',
    temp: '--',
    timestamp: Date.now(),
  });

  useEffect(() => {
    // TODO: close connection on unmountComponent
    const client = mqtt.connect(settings.BROKER_URL);
    client.subscribe(`oximetroiot/${route}`, function (err) {
      console.log(`subscribing to oximetroiot/${route}....`);
      if (err) {
        console.log('error');
      }
    });

    client.on('message', function (topic, message) {
      const { beat, spo2, temp } = JSON.parse(message.toString());
      const timestamp = Date.now();
      setSensors({ beat, spo2, temp, timestamp });
    });
  }, [route]);

  return (
    <div className="card-container">
      <div className="alert-bar">
        <strong>Hello Alert</strong>
      </div>
      <div className="content">
        <h1>{name}</h1>
        <div className="sensor-info">
          <FaHeartbeat size={32} />
          <p>{sensors.beat} bpm</p>
        </div>
        <div className="sensor-info">
          <WiThermometer size={32} />
          <p>{sensors.temp} ºC</p>
        </div>
        <div className="sensor-info">
          <GiLungs size={32} />
          <p>{sensors.spo2} %</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
