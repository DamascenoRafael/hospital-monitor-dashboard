import React from 'react';

import { FiAlertCircle } from 'react-icons/fi';
import { MdAddAlert } from 'react-icons/md';
import { AiOutlineWarning } from 'react-icons/ai';
import './styles.css';

const AlertToaster = ({ hospitalBedId, alertType, onClose }) => {
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
      <div className="toaster-title">Leito {hospitalBedId}</div>
      <div className="toaster-content">Alerta tipo {alertType}</div>
    </div>
  );
};

export default AlertToaster;
