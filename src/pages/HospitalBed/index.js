import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import mqtt from 'mqtt';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import TimeAgo from 'react-timeago';
import brazilianStrings from 'react-timeago/lib/language-strings/pt-br';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

import { FaHeartbeat } from 'react-icons/fa';
import { GiLungs } from 'react-icons/gi';
import { WiThermometer } from 'react-icons/wi';

import RecordsQueue from '../../helpers/RecordsQueue';
import settings from '../../settings';

import './styles.css';

const HospitalBed = () => {
  let { id } = useParams();
  const name = settings.HOSPITAL_BEDS.find((bed) => bed.sensor_id === parseInt(id)).name;

  const emptyRecord = {
    beat: '--',
    spo2: '--',
    temp: '--',
    timestamp: Date.now(),
  };

  const recordsQueue = new RecordsQueue(100, `sensor-${id}`, [emptyRecord]);
  recordsQueue.loadLocal();

  const [sensors, setSensors] = useState(recordsQueue.getLast());

  useEffect(() => {
    // TODO: close connection on unmountComponent
    const client = mqtt.connect(settings.BROKER_URL);
    client.subscribe(`oximetroiot/${id}`, function (err) {
      console.log(`hospital_bed subscribing to oximetroiot/${id}....`);
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
  }, [id]);

  const calculateTicks = (sensor, step = 5, offset = 10) => {
    const allData = recordsQueue.queue.map((record) => parseInt(record[sensor]));
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

  const timeFormatter = buildFormatter(brazilianStrings);

  return (
    <div>
      <div className="sub-header-container">
        <p>{name}</p>
        <div className="time-ago">
          Atualizado <TimeAgo live={true} date={sensors.timestamp} formatter={timeFormatter} />
        </div>
      </div>
      <div className="hospital-bed-container">
        <div className="info-chart-container">
          <div className="card-container card-info-container">
            <h2>Freq. Cardíaca</h2>
            <FaHeartbeat size={64} />
            <h2>{sensors.beat} bpm</h2>
          </div>
          <div className="card-container card-chart-container">
            <ResponsiveContainer width="100%" height="80%">
              <LineChart data={recordsQueue.queue} syncId="anyId" margin={{ top: 8, right: 25, left: 0, bottom: 8 }}>
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
            <h2>{sensors.spo2} %</h2>
          </div>
          <div className="card-container card-chart-container">
            <ResponsiveContainer width="100%" height="80%">
              <LineChart data={recordsQueue.queue} syncId="anyId" margin={{ top: 8, right: 25, left: 0, bottom: 8 }}>
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
            <h2>{sensors.temp} ºC</h2>
          </div>
          <div className="card-container card-chart-container">
            <ResponsiveContainer width="100%" height="80%">
              <LineChart data={recordsQueue.queue} syncId="anyId" margin={{ top: 8, right: 25, left: 0, bottom: 8 }}>
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

export default HospitalBed;
