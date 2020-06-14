import React from 'react';
import { connect } from 'react-redux';

import { FiAlertCircle } from 'react-icons/fi';
import { MdAddAlert } from 'react-icons/md';
import { AiOutlineWarning } from 'react-icons/ai';

import TimeAgoLabel from '../TimeAgoLabel';

import './styles.css';

const AlertToaster = ({ alertType, message, onClose, timestamp, hospitalBed }) => {
  const handleAlertType = (alertType) => {
    switch (alertType) {
      case 1: {
        return (
          <div className="toaster-left-bar alert">
            <MdAddAlert size={32} />
          </div>
        );
      }
      case 2: {
        return (
          <div className="toaster-left-bar warning">
            <AiOutlineWarning size={32} />
          </div>
        );
      }
      case 3: {
        return (
          <div className="toaster-left-bar danger">
            <FiAlertCircle size={32} />
          </div>
        );
      }
      default: {
        return (
          <div className="toaster-left-bar">
            <FiAlertCircle size={32} />
          </div>
        );
      }
    }
  };

  return (
    <div className="toaster" onClick={onClose} title="Clique para fechar">
      {handleAlertType(alertType)}
      <div className="toaster-title">
        {hospitalBed.name}
        <div className="toaster-time">
          <TimeAgoLabel date={timestamp} />
        </div>
      </div>
      <div className="toaster-content">{message}</div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { sensorId } = ownProps;
  const hospitalBed = state.hospitalBeds[sensorId];
  return { hospitalBed };
};

export default connect(mapStateToProps)(AlertToaster);
