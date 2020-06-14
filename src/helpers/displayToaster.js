import React from 'react';
import toaster from 'toasted-notes';
import AlertToaster from '../components/AlertToaster';

const displayToaster = (sensorId, alertType, message, timestamp) => {
  toaster.notify(
    ({ onClose }) => (
      <AlertToaster
        sensorId={sensorId}
        alertType={alertType}
        message={message}
        timestamp={timestamp}
        onClose={onClose}
      />
    ),
    {
      position: 'bottom-right',
      duration: null,
    }
  );
};

export default displayToaster;
