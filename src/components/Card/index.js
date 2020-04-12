import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import TimeAgo from 'react-timeago';

import { IoIosReturnLeft } from 'react-icons/io';

import FrontCard from './FrontCard';
import BackCard from './BackCard';

import timeAgoFormatter from '../../helpers/timeAgoFormatter';
import timeFormatter from '../../helpers/timeFormatter';

import './styles.css';

const Card = ({ name, sensorId, sensorData, records }) => {
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
          <div className="alert-bar normal" />
          <FrontCard name={name} sensors={sensorData} />
          <div className="time-ago">
            <TimeAgo
              live={true}
              date={sensorData.timestamp}
              formatter={timeAgoFormatter}
              title={timeFormatter(sensorData.timestamp)}
            />
          </div>
          <button className="button" onClick={(event) => handleFlipCard(event)} type="button" title="Ver estatísticas">
            <IoIosReturnLeft size={28} />
          </button>
        </div>
        <div className="card-face back-card-container">
          <div className="alert-bar normal" />
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
  const records = state.sensors[sensorId];
  const sensorData = records[records.length - 1];
  return { records, sensorData };
};

export default connect(mapStateToProps)(Card);
