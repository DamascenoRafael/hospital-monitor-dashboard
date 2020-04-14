import React from 'react';
import { connect } from 'react-redux';

import Card from '../../components/Card';

import './styles.css';

const Monitor = ({ hospitalBeds }) => {
  return (
    <div className="monitor-container">
      <div className="beds-container">
        {hospitalBeds.map((hospitalBed, id) => (
          <Card key={id} name={hospitalBed.name} sensorId={hospitalBed.sensorId} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const hospitalBeds = state.hospitalBeds;
  return { hospitalBeds };
};

export default connect(mapStateToProps)(Monitor);
