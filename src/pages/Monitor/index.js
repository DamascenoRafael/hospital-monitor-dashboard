import React from 'react';

import Card from '../../components/Card';
import settings from '../../settings';

import './styles.css';

const Monitor = () => {
  return (
    <div className="monitor-container">
      <div className="beds-container">
        {settings.HOSPITAL_BEDS.map((hospital_bed, id) => (
          <Card
            key={id}
            name={hospital_bed.name}
            route={hospital_bed.sensor_id}
          />
        ))}
      </div>
    </div>
  );
};

export default Monitor;
