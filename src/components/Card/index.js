import React, { useState, useEffect } from 'react';
import mqtt from 'mqtt';
import TimeAgo from 'react-timeago';
import brazilianStrings from 'react-timeago/lib/language-strings/pt-br';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

import { FaHeartbeat } from 'react-icons/fa';
import { GiLungs } from 'react-icons/gi';
import { WiThermometer } from 'react-icons/wi';

import RecordsQueue from '../../helpers/RecordsQueue';
import settings from '../../settings';

import './styles.css';

const Card = ({ name, route }) => {

  const record = {
    beat: '--',
    spo2: '--',
    temp: '--',
    timestamp: Date.now(),
  }

  const recordsQueue = new RecordsQueue(5, `sensor-${route}`, [record]);
  recordsQueue.loadLocal();

  const [sensors, setSensors] = useState(recordsQueue.getLast());


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
      recordsQueue.add({ beat, spo2, temp, timestamp });
      recordsQueue.saveLocal();
    });

  }, [route]);


  const timeFormatter = buildFormatter(brazilianStrings);

  return (
    <div className="card-container">
      <div className="alert-bar normal" />
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
        <span className="time-ago">
          <TimeAgo
            live={true}
            date={sensors.timestamp}
            formatter={timeFormatter}
          />
        </span>
      </div>
    </div>
  );
};

export default Card;
