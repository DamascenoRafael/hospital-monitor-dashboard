import React from 'react';
import TimeAgo from 'react-timeago';
import brazilianStrings from 'react-timeago/lib/language-strings/pt-br';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

import timeFormatter from '../../helpers/timeFormatter';

const TimeAgoLabel = ({ date, short = true, expired = false }) => {
  const timeAgoFormatter = buildFormatter(brazilianStrings);

  if (isNaN(date)) {
    return 'Nenhum dado recebido';
  }

  const complement = short ? '' : 'Atualizado ';

  const style = {
    color: expired ? 'red' : 'black',
    fontWeight: expired ? 'bold' : 'normal',
  };

  return (
    <span>
      {complement}
      <TimeAgo
        live={true}
        date={date}
        formatter={timeAgoFormatter}
        title={'Última atualização: ' + timeFormatter(date)}
        style={style}
      />
    </span>
  );
};

export default TimeAgoLabel;
