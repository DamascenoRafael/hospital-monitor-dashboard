import React from 'react';
import { FaHeartbeat } from 'react-icons/fa';
import { GiLungs } from 'react-icons/gi';
import { WiBarometer, WiThermometer } from 'react-icons/wi';

import './styles.css';

const Card = () => {
  return (
    <div className="card-container">
      <div className="alert-bar">
        <strong>Hello Alert</strong>
      </div>
      <div className="content">
        <div className="sensor-info">
          <FaHeartbeat size={32} />
          <p>80 bpm</p>
        </div>
        <div className="sensor-info">
          <WiThermometer size={32} />
          <p>35.5 ºC</p>
        </div>
        <div className="sensor-info">
          <GiLungs size={32} />
          <p>92 %</p>
        </div>
        <div className="sensor-info">
          <WiBarometer size={32} />
          <p>140 mmHg</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
