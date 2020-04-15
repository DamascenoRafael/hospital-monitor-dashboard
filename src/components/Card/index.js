import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { IoIosReturnLeft } from 'react-icons/io';

import FrontCard from './FrontCard';
import BackCard from './BackCard';
import TimeAgoLabel from '../TimeAgoLabel';
import timeFormatter from '../../helpers/timeFormatter';

import './styles.css';

const Card = ({ name, sensorId, sensorData, records, isDataExpired }) => {
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const history = useHistory();

  const handleCardClick = () => {
    history.push(`/beds/${sensorId}`);
  };

  const handleFlipCard = (event) => {
    event.stopPropagation();
    setIsCardFlipped(!isCardFlipped);
  };

  return (
    <div className="card-container-holder">
      <div onClick={handleCardClick} className={isCardFlipped ? 'card-container is-flipped' : 'card-container'}>
        <div className="card-face front-card-container">
          <div className={isDataExpired ? 'alert-bar expired' : 'alert-bar normal'} />
          <FrontCard name={name} sensorData={sensorData} />
          <div className="time-ago">
            <TimeAgoLabel date={sensorData.timestamp} expired={isDataExpired} />
          </div>
          <button className="button" onClick={(event) => handleFlipCard(event)} type="button" title="Ver estatísticas">
            <IoIosReturnLeft size={28} />
          </button>
        </div>
        <div className="card-face back-card-container">
          <div className={isDataExpired ? 'alert-bar expired' : 'alert-bar normal'} />
          <BackCard name={name} records={records} />
          <div className="time-ago">
            <p>ID do Sensor: {sensorId}</p>
            Entre {timeFormatter(records[0].timestamp)} - {timeFormatter(sensorData.timestamp)}
          </div>
          <button
            className="button"
            onClick={(event) => handleFlipCard(event)}
            type="button"
            title="Ver dados em tempo real"
          >
            <IoIosReturnLeft size={28} />
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

export default connect(mapStateToProps)(Card);
