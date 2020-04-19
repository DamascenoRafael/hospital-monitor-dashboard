import React from 'react';
import { connect } from 'react-redux';

import Table from '../../components/Table';

const Reports = ({ reports, hospitalBeds }) => {
  return (
    <div className="monitor-container">
      <div className="beds-container">
        {hospitalBeds.map((hospitalBed, id) => (
          <Table key={id} name={hospitalBed.name} reports={reports[hospitalBed.sensorId].data} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const reports = state.reports;
  const hospitalBeds = state.hospitalBeds;
  return { reports, hospitalBeds };
};

export default connect(mapStateToProps)(Reports);
