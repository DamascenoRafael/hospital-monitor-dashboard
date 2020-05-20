import React from 'react';

import { FaHeartbeat } from 'react-icons/fa';
import { GiLungs } from 'react-icons/gi';
import { WiThermometer } from 'react-icons/wi';

import './styles.css';

const BackCard = ({ name, records }) => {
  const calculateStatistics = (data, toFixed = false) => {
    if (isNaN(data[0])) {
      return { maxData: '--', avgData: '--', minData: '--' };
    }
    const maxData = toFixed ? Math.max(...data).toFixed(1) : Math.max(...data);
    const sumData = data.reduce((accumulator, current) => accumulator + Number(current), 0);
    const avgData = (sumData / data.length).toFixed(1);
    const minData = toFixed ? Math.min(...data).toFixed(1) : Math.min(...data);
    return { maxData, avgData, minData };
  };

  let statistics = {};
  statistics.beat = calculateStatistics(records.map((record) => record.beat));
  statistics.spo2 = calculateStatistics(records.map((record) => record.spo2));
  statistics.temp = calculateStatistics(
    records.map((record) => record.temp),
    true
  );

  return (
    <div className="content">
      <h1>{name}</h1>
      <table className="sensor-statistics-table">
        <tbody>
          <tr>
            <th className="sensor-data-col"></th>
            <th className="sensor-data-col">Min</th>
            <th className="sensor-data-col">Média</th>
            <th className="sensor-data-col">Max</th>
            <th></th>
          </tr>
          <tr>
            <td className="sensor-data-col">
              <FaHeartbeat size={32} />
            </td>
            <td className="sensor-data-col">{statistics.beat.minData}</td>
            <td className="sensor-data-col">{statistics.beat.avgData}</td>
            <td className="sensor-data-col">{statistics.beat.maxData}</td>
            <td className="sensor-unit-col">bpm</td>
          </tr>
          <tr>
            <td className="sensor-data-col">
              <GiLungs size={32} />
            </td>
            <td className="sensor-data-col">{statistics.spo2.minData}</td>
            <td className="sensor-data-col">{statistics.spo2.avgData}</td>
            <td className="sensor-data-col">{statistics.spo2.maxData}</td>
            <td className="sensor-unit-col">%</td>
          </tr>
          <tr>
            <td className="sensor-data-col">
              <WiThermometer size={32} />
            </td>
            <td className="sensor-data-col">{statistics.temp.minData}</td>
            <td className="sensor-data-col">{statistics.temp.avgData}</td>
            <td className="sensor-data-col">{statistics.temp.maxData}</td>
            <td className="sensor-unit-col">°C</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BackCard;
