import React from 'react';
import { useParams } from 'react-router-dom';

import { FaHeartbeat } from 'react-icons/fa';
import { GiLungs } from 'react-icons/gi';
import { WiThermometer } from 'react-icons/wi';

import './styles.css';

const HospitalBed = () => {
  let { id } = useParams();
  return (
    <div className="hospital-bed-container">
      <div className="info-chart-container">
        <div className="card-container card-info-container">
          <h1>Batimentos</h1>
          <FaHeartbeat size={64} />
          <h2>80 bpm</h2>
        </div>
        <div className="card-container card-chart-container">
          <h2>I will be a chart {id}</h2>
        </div>
      </div>
      <div className="info-chart-container">
        <div className="card-container card-info-container">
          <h1>spO2</h1>
          <GiLungs size={64} />
          <h2>92 %</h2>
        </div>
        <div className="card-container card-chart-container">
          <h2>I will be a chart {id}</h2>
        </div>
      </div>
      <div className="info-chart-container">
        <div className="card-container card-info-container">
          <h1>Temperatura</h1>
          <WiThermometer size={64} />
          <h2>37.5 ºC</h2>
        </div>
        <div className="card-container card-chart-container">
          <h2>I will be a chart {id}</h2>
        </div>
      </div>
    </div>
  );
};

export default HospitalBed;
