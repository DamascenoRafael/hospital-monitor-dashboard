import React from 'react';
import { Provider } from 'react-redux';
import toaster from 'toasted-notes';

import store from '../store';
import AlertToaster from '../components/AlertToaster';

const displayToaster = (sensorId, alertType, message, timestamp) => {
  toaster.notify(
    ({ onClose }) => (
      <Provider store={store}>
        <AlertToaster
          sensorId={sensorId}
          alertType={alertType}
          message={message}
          timestamp={timestamp}
          onClose={onClose}
        />
      </Provider>
    ),
    {
      position: 'bottom-right',
      duration: null,
    }
  );
};

export default displayToaster;
