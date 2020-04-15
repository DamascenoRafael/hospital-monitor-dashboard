import React from 'react';
import { connect } from 'react-redux';

import GenericBarChart from '../../components/GenericBarChart';

import './styles.css';

const Charts = ({ data }) => {
  return (
    <div className="aggregated-charts-container">
      <div className="info-chart-container">
        <GenericBarChart
          data={data}
          dataKeyX="name"
          syncId="anyId"
          dataKeyY="beat"
          barName="Freq. Cardíaca"
          unit=" bpm"
          fillColor="#2fc432"
        />
      </div>
      <div className="info-chart-container">
        <GenericBarChart
          data={data}
          dataKeyX="name"
          syncId="anyId"
          dataKeyY="spo2"
          barName="SpO2"
          unit="%"
          fillColor="#2076e0"
        />
      </div>
      <div className="info-chart-container">
        <GenericBarChart
          data={data}
          dataKeyX="name"
          syncId="anyId"
          dataKeyY="temp"
          barName="Temperatura"
          unit="°C"
          fillColor="#e02041"
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  let data = [];
  state.hospitalBeds.forEach((hospitalBed) => {
    const name = hospitalBed.name;
    const records = state.sensors[hospitalBed.sensorId].data;
    const { beat, spo2, temp } = records[records.length - 1];
    data.push({ name, beat, spo2, temp });
  });
  return { data };
};

export default connect(mapStateToProps)(Charts);
