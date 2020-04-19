import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { IoIosReturnLeft } from 'react-icons/io';
import { MdDeleteSweep } from 'react-icons/md';

import FrontCard from './FrontCard';
import BackCard from './BackCard';
import TimeAgoLabel from '../TimeAgoLabel';
import TimeIntervalLabel from '../TimeIntervalLabel';
import { deleteSensorData } from '../../actions';

import './styles.css';

const Card = ({ name, sensorId, sensorData, records, isDataExpired, deleteSensorData }) => {
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const history = useHistory();

  const handleCardClick = () => {
    history.push(`/beds/${sensorId}`);
  };

  const handleFlipCard = (event) => {
    event.stopPropagation();
    setIsCardFlipped(!isCardFlipped);
  };

  const handleDeleteSensorData = (event) => {
    event.stopPropagation();
    deleteSensorData(sensorId);
  };

  return (
    <div className="card-container-holder">
      <div onClick={handleCardClick} className={isCardFlipped ? 'card-container is-flipped' : 'card-container'}>
        <div className="card-face front-card-container">
          <div className={isDataExpired ? 'alert-bar expired' : 'alert-bar normal'} />
          <FrontCard name={name} sensorData={sensorData} />
          <div className="time-label">
            <TimeAgoLabel date={sensorData.timestamp} expired={isDataExpired} />
          </div>
          <button className="button" onClick={(event) => handleFlipCard(event)} type="button" title="Ver estatísticas">
            <IoIosReturnLeft size={28} />
          </button>
        </div>
        <div className="card-face back-card-container">
          <div className={isDataExpired ? 'alert-bar expired' : 'alert-bar normal'} />
          <BackCard name={name} records={records} />
          <div className="time-label">
            <p>ID do Sensor: {sensorId}</p>
            <TimeIntervalLabel start={records[0].timestamp} end={sensorData.timestamp} />
          </div>
          <button
            className="button"
            onClick={(event) => handleFlipCard(event)}
            type="button"
            title="Ver dados em tempo real"
          >
            <IoIosReturnLeft size={28} />
          </button>
          <button
            className="button delete"
            onClick={(event) => handleDeleteSensorData(event)}
            type="button"
            title="Deletar registros do sensor"
          >
            <MdDeleteSweep size={22} color="red" />
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { sensorId } = ownProps;
  const records = state.sensors[sensorId].data;
  const isDataExpired = state.sensors[sensorId].expired;
  const sensorData = records[records.length - 1];
  return { records, sensorData, isDataExpired };
};

export default connect(mapStateToProps, { deleteSensorData })(Card);
