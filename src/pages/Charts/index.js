import React, { useState, useEffect } from 'react';

import GenericBarChart from '../../components/Charts/GenericBarChart'

import './styles.css';

const Charts = () => {

  const data = [
    {
      name: 'Leito 1', uv: 100, pv: 2400, amt: 2400,
    },
    {
      name: 'Leito 2', uv: 123, pv: 1398, amt: 2210,
    },
    {
      name: 'Leito 3', uv: 269, pv: 9800, amt: 2290,
    },
    {
      name: 'Leito 4', uv: 88, pv: 3908, amt: 2000,
    },
    {
      name: 'Leito 5', uv: 76, pv: 4800, amt: 2181,
    },
    {
      name: 'Leito 6', uv: 94, pv: 3800, amt: 2500,
    },
    {
      name: 'Leito 7', uv: 104, pv: 4300, amt: 2100,
    },
    {
      name: 'Leito 8', uv: 69, pv: 4300, amt: 2100,
    },
    {
      name: 'Leito 9', uv: 81, pv: 4300, amt: 2100,
    },
    {
      name: 'Leito 10', uv: 88, pv: 4300, amt: 2100,
    },
  ];

  return (
    <div className="aggregated-charts-container">
      <div className="info-chart-container">
        <GenericBarChart data={data} dataKeyX="name" syncId="anyId" dataKeyY="uv" barName="Freq. Cardíaca" unit=" bpm" fillColor="#2fc432" />
      </div>
      <div className="info-chart-container">
        <GenericBarChart data={data} dataKeyX="name" syncId="anyId" dataKeyY="pv" barName="SpO2" unit="%" fillColor="#2076e0" />
      </div>
      <div className="info-chart-container">
        <GenericBarChart data={data} dataKeyX="name" syncId="anyId" dataKeyY="amt" barName="Temperatura" unit="°C" fillColor="#e02041" />
      </div>
    </div>
  );
};

export default Charts;




