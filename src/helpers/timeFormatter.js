const timeFormatter = (timestamp) => {
  var a = new Date(timestamp);
  var hour = a.getHours();
  var min = '0' + a.getMinutes();
  var sec = '0' + a.getSeconds();
  var time = hour + ':' + min.substr(-2) + ':' + sec.substr(-2);
  return time;
};

export default timeFormatter;
