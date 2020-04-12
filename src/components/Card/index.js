import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import TimeAgo from 'react-timeago';

import FrontCard from './FrontCard';
import BackCard from './BackCard';
import timeFormatter from '../../helpers/timeFormatter';

import './styles.css';

const Card = ({ name, sensorId, sensorData }) => {
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const history = useHistory();

  const handleCardClick = () => {
    // setIsCardFlipped(!isCardFlipped);
    history.push(`/beds/${sensorId}`);
  };

  return (
    <div className="card-container-holder">
      <div onClick={handleCardClick} className={isCardFlipped ? 'card-container is-flipped' : 'card-container'}>
        <div className="card-face front-card-container">
          <div className="alert-bar normal" />
          <FrontCard name={name} sensors={sensorData} />
          <div className="time-ago">
            <TimeAgo live={true} date={sensorData.timestamp} formatter={timeFormatter} />
          </div>
        </div>
        <div className="card-face back-card-container">
          <div className="alert-bar normal" />
          <BackCard name={name} />
          <div className="time-ago">
            <TimeAgo live={true} date={sensorData.timestamp} formatter={timeFormatter} />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { sensorId } = ownProps;
  const records = state.sensors[sensorId];
  const sensorData = records[records.length - 1];
  return { sensorData };
};

export default connect(mapStateToProps)(Card);
