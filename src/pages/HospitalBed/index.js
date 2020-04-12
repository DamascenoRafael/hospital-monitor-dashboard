import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import TimeAgo from 'react-timeago';

import { FaHeartbeat } from 'react-icons/fa';
import { GiLungs } from 'react-icons/gi';
import { WiThermometer } from 'react-icons/wi';

import timeFormatter from '../../helpers/timeFormatter';
import settings from '../../settings';

import './styles.css';

const HospitalBed = ({ records, sensorData }) => {
  let { id } = useParams();
  const name = settings.HOSPITAL_BEDS.find((bed) => bed.sensor_id === parseInt(id)).name;

  const calculateTicks = (sensor, step = 5, offset = 10) => {
    const allData = records.map((record) => parseInt(record[sensor]));
    const dataMin = Math.min(...allData);
    const dataMax = Math.max(...allData);
    const start = Math.floor(dataMin / step) * step - offset;
    const end = Math.floor(dataMax / step) * step + offset;
    let ticks = [];
    for (let index = start; index <= end; index += step) {
      ticks.push(index);
    }
    return ticks;
  };

  const ticks_beat = calculateTicks('beat', 5, 5);
  const ticks_spo2 = calculateTicks('spo2', 1, 1);
  const ticks_temp = calculateTicks('temp', 0.5, 1);

  function timeConverter(timestamp) {
    var a = new Date(timestamp);
    var hour = a.getHours();
    var min = '0' + a.getMinutes();
    var sec = '0' + a.getSeconds();
    var time = hour + ':' + min.substr(-2) + ':' + sec.substr(-2);
    return time;
  }

  return (
    <div>
      <div className="sub-header-container">
        <p>{name}</p>
        <div className="time-ago">
          Atualizado <TimeAgo live={true} date={sensorData.timestamp} formatter={timeFormatter} />
        </div>
      </div>
      <div className="hospital-bed-container">
        <div className="info-chart-container">
          <div className="card-container card-info-container">
            <h2>Freq. Cardíaca</h2>
            <FaHeartbeat size={64} />
            <h2>{sensorData.beat} bpm</h2>
          </div>
          <div className="card-container card-chart-container">
            <ResponsiveContainer width="100%" height="80%">
              <LineChart data={records} syncId="anyId" margin={{ top: 8, right: 25, left: 0, bottom: 8 }}>
                <CartesianGrid strokeDasharray="1 1" />
                <XAxis hide dataKey="timestamp" interval={0} tickFormatter={(timeStr) => timeConverter(timeStr)} />
                <YAxis
                  type="number"
                  interval={0}
                  domain={[(dataMin) => Math.floor(dataMin / 5) * 5, (dataMax) => Math.floor(dataMax / 5) * 5]}
                  axisLine={false}
                  unit=" bpm"
                  ticks={ticks_beat}
                />
                <Tooltip labelFormatter={(timeStr) => timeConverter(timeStr)} />
                <Line
                  name="Freq. Cardíaca"
                  type="monotone"
                  dataKey="beat"
                  stroke="#2fc432"
                  fill="#2fc432"
                  dot={false}
                  isAnimationActive={false}
                  unit=" bpm"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="info-chart-container">
          <div className="card-container card-info-container">
            <h2>SpO2</h2>
            <GiLungs size={64} />
            <h2>{sensorData.spo2} %</h2>
          </div>
          <div className="card-container card-chart-container">
            <ResponsiveContainer width="100%" height="80%">
              <LineChart data={records} syncId="anyId" margin={{ top: 8, right: 25, left: 0, bottom: 8 }}>
                <CartesianGrid strokeDasharray="1 1" />
                <XAxis hide dataKey="timestamp" interval={0} tickFormatter={(timeStr) => timeConverter(timeStr)} />
                <YAxis
                  type="number"
                  interval={0}
                  domain={[(dataMin) => dataMin, (dataMax) => dataMax]}
                  axisLine={false}
                  unit=" %"
                  ticks={ticks_spo2}
                />
                <Tooltip labelFormatter={(timeStr) => timeConverter(timeStr)} />
                <Line
                  name="SpO2"
                  type="monotone"
                  dataKey="spo2"
                  stroke="#2076e0"
                  fill="#2076e0"
                  dot={false}
                  isAnimationActive={false}
                  unit=" %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="info-chart-container">
          <div className="card-container card-info-container">
            <h2>Temperatura</h2>
            <WiThermometer size={64} />
            <h2>{sensorData.temp} ºC</h2>
          </div>
          <div className="card-container card-chart-container">
            <ResponsiveContainer width="100%" height="80%">
              <LineChart data={records} syncId="anyId" margin={{ top: 8, right: 25, left: 0, bottom: 8 }}>
                <CartesianGrid strokeDasharray="1 1" />
                <XAxis hide dataKey="timestamp" interval={0} tickFormatter={(timeStr) => timeConverter(timeStr)} />
                <YAxis
                  type="number"
                  interval={0}
                  domain={[(dataMin) => dataMin, (dataMax) => dataMax]}
                  axisLine={false}
                  unit=" ºC"
                  ticks={ticks_temp}
                  tickFormatter={(valueStr) => valueStr.toFixed(1)}
                />
                <Tooltip labelFormatter={(timeStr) => timeConverter(timeStr)} />
                <Line
                  name="Temperatura"
                  type="monotone"
                  dataKey="temp"
                  stroke="#e02041"
                  fill="#e02041"
                  dot={false}
                  isAnimationActive={false}
                  unit=" ºC"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.id;
  const records = state.sensors[id];
  const sensorData = records[records.length - 1];
  return { records, sensorData };
};

export default connect(mapStateToProps)(HospitalBed);
