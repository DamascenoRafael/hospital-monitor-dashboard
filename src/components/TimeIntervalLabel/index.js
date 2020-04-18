import React from 'react';

import timeFormatter from '../../helpers/timeFormatter';

const TimeIntervalLabel = ({ start, end }) => {
  if (isNaN(start)) {
    return <span>Nenhum dado recebido</span>;
  }

  return (
    <span>
      Entre {timeFormatter(start)} - {timeFormatter(end)}
    </span>
  );
};

export default TimeIntervalLabel;
