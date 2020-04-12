import React from 'react';

import { FaHeartbeat } from 'react-icons/fa';
import { GiLungs } from 'react-icons/gi';
import { WiThermometer } from 'react-icons/wi';

import './styles.css';

const BackCard = ({ name, records }) => {
  const calculateStatistics = (data) => {
    const maxData = Math.max(...data);
    const sumData = data.reduce((previous, current) => (current += previous));
    const avgData = (sumData / data.length).toFixed(1);
    const minData = Math.min(...data);
    return { maxData, avgData, minData };
  };

  let statistics = {};
  statistics.beat = calculateStatistics(records.map((record) => record.beat));
  statistics.spo2 = calculateStatistics(records.map((record) => record.spo2));
  statistics.temp = calculateStatistics(records.map((record) => record.temp));

  const sensors = records[records.length - 1];

  return (
    <div className="content">
      <h1>{name}</h1>
      <div className="sensor-info">
        <FaHeartbeat size={32} />
        <p>{statistics.beat.maxData}</p>
        <p>{statistics.beat.avgData}</p>
        <p>{statistics.beat.minData}</p>
        <p>bpm</p>
      </div>
      <div className="sensor-info">
        <GiLungs size={32} />
        <p>{statistics.spo2.maxData}</p>
        <p>{statistics.spo2.avgData}</p>
        <p>{statistics.spo2.minData}</p>
        <p>%</p>
      </div>
      <div className="sensor-info">
        <WiThermometer size={32} />
        <p>{statistics.temp.maxData}</p>
        <p>{statistics.temp.avgData}</p>
        <p>{statistics.temp.minData}</p>
        <p>ºC</p>
      </div>
    </div>
  );
};

export default BackCard;
