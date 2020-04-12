import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import TimeAgo from 'react-timeago';

import { FaHeartbeat } from 'react-icons/fa';
import { GiLungs } from 'react-icons/gi';
import { WiThermometer } from 'react-icons/wi';

import TimeSerieLineChart from '../../components/TimeSerieLineChart';
import timeFormatter from '../../helpers/timeFormatter';
import timeAgoFormatter from '../../helpers/timeAgoFormatter';
import settings from '../../settings';

import './styles.css';

const HospitalBed = ({ records, sensorData }) => {
  let { id } = useParams();
  const name = settings.HOSPITAL_BEDS.find((bed) => bed.sensor_id === parseInt(id)).name;

  return (
    <div>
      <div className="sub-header-container">
        <p>{name}</p>
        <div className="time-ago">
          ID do Sensor: {id} - Atualizado{' '}
          <TimeAgo
            live={true}
            date={sensorData.timestamp}
            formatter={timeAgoFormatter}
            title={timeFormatter(sensorData.timestamp)}
          />
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
            <TimeSerieLineChart
              data={records}
              dataKeyX="timestamp"
              dataKeyY="beat"
              syncId="anyId"
              fillColor="#2fc432"
              unit=" bpm"
              lineName="Freq. Cardíaca"
              tickStep={2}
              tickOffset={2}
            />
          </div>
        </div>
        <div className="info-chart-container">
          <div className="card-container card-info-container">
            <h2>SpO2</h2>
            <GiLungs size={64} />
            <h2>{sensorData.spo2} %</h2>
          </div>
          <div className="card-container card-chart-container">
            <TimeSerieLineChart
              data={records}
              dataKeyX="timestamp"
              dataKeyY="spo2"
              syncId="anyId"
              fillColor="#2076e0"
              unit=" %"
              lineName="SpO2"
              tickStep={1}
              tickOffset={1}
            />
          </div>
        </div>
        <div className="info-chart-container">
          <div className="card-container card-info-container">
            <h2>Temperatura</h2>
            <WiThermometer size={64} />
            <h2>{sensorData.temp} ºC</h2>
          </div>
          <div className="card-container card-chart-container">
            <TimeSerieLineChart
              data={records}
              dataKeyX="timestamp"
              dataKeyY="temp"
              syncId="anyId"
              fillColor="#e02041"
              unit=" ºC"
              lineName="Temperatura"
              tickStep={0.5}
              tickOffset={1}
              valueFormatter={(value) => value.toFixed(1)}
            />
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
