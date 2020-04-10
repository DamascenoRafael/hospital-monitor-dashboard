import React from 'react';

import { FaHeartbeat } from 'react-icons/fa';
import { GiLungs } from 'react-icons/gi';
import { WiThermometer } from 'react-icons/wi';

import './styles.css';

const BackCard = ({ name, queueSensors }) => {
  return (
    <div className="content">
      <h1>{name}</h1>
    </div>
  );
};

export default BackCard;
