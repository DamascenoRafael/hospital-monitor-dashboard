import React from 'react';

import './styles.css';

import Card from '../../components/Card';

const Monitor = () => {
  return (
    <div className="monitor-container">
      <div className="beds-container">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default Monitor;
