import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import mqtt from 'mqtt';
import TimeAgo from 'react-timeago';
import brazilianStrings from 'react-timeago/lib/language-strings/pt-br';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

import FrontCard from './FrontCard';
import BackCard from './BackCard';
import RecordsQueue from '../../helpers/RecordsQueue';
import settings from '../../settings';

import './styles.css';

const Card = ({ name, route }) => {
  const history = useHistory();

  const emptyRecord = {
    beat: '--',
    spo2: '--',
    temp: '--',
    timestamp: Date.now(),
  };

  const recordsQueue = new RecordsQueue(100, `sensor-${route}`, [emptyRecord]);
  recordsQueue.loadLocal();

  const [sensors, setSensors] = useState(recordsQueue.getLast());
  const [isCardFlipped, setIsCardFlipped] = useState(false);

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

  const handleCardClick = () => {
    // setIsCardFlipped(!isCardFlipped);
    history.push(`/beds/${route}`);
  };

  const timeFormatter = buildFormatter(brazilianStrings);

  return (
    <div className="card-container-holder">
      <div onClick={handleCardClick} className={isCardFlipped ? 'card-container is-flipped' : 'card-container'}>
        <div className="card-face front-card-container">
          <div className="alert-bar normal" />
          <FrontCard name={name} sensors={sensors} />
          <div className="time-ago">
            <TimeAgo live={true} date={sensors.timestamp} formatter={timeFormatter} />
          </div>
        </div>
        <div className="card-face back-card-container">
          <div className="alert-bar normal" />
          <BackCard name={name} queueSensors={recordsQueue.queue} />
          <div className="time-ago">
            <TimeAgo live={true} date={sensors.timestamp} formatter={timeFormatter} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
