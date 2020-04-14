import React from 'react';
import TimeAgo from 'react-timeago';
import brazilianStrings from 'react-timeago/lib/language-strings/pt-br';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

import timeFormatter from '../../helpers/timeFormatter';

const TimeAgoLabel = ({ date, short = true }) => {
  const timeAgoFormatter = buildFormatter(brazilianStrings);

  if (isNaN(date)) {
    return 'Nenhum dado recebido';
  }

  const complement = short ? '' : 'Atualizado ';
  return (
    <span>
      {complement}
      <TimeAgo live={true} date={date} formatter={timeAgoFormatter} title={timeFormatter(date)} />
    </span>
  );
};

export default TimeAgoLabel;
