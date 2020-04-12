import brazilianStrings from 'react-timeago/lib/language-strings/pt-br';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

const timeAgoFormater = buildFormatter(brazilianStrings);

export default timeAgoFormater;
