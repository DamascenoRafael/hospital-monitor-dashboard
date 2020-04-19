const timeFormatter = (timestamp, useSeconds = true) => {
  const a = new Date(timestamp);
  const hour = a.getHours();
  const min = '0' + a.getMinutes();
  const sec = '0' + a.getSeconds();

  return useSeconds ? hour + ':' + min.substr(-2) + ':' + sec.substr(-2) : hour + ':' + min.substr(-2);
};

export default timeFormatter;
