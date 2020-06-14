import settings from 'settings';

const handleBrokerConnect = (client, hospitalBeds) => {
  hospitalBeds.forEach((hospitalBed) => {
    const sensorId = hospitalBed.sensorId;
    const oximeterTopic = `${settings.OXIMETERS_TOPIC}/${sensorId}`;
    const alertTopic = `${settings.ALERTS_TOPIC}/${sensorId}`;
    client.subscribe(oximeterTopic, function (err) {
      console.log(`subscribing to ${oximeterTopic}...`);
      if (err) {
        console.log(`error subscribing to ${oximeterTopic}...`);
        console.log(err);
      }
    });
    client.subscribe(alertTopic, function (err) {
      console.log(`subscribing to ${alertTopic}...`);
      if (err) {
        console.log(`error subscribing to ${alertTopic}...`);
        console.log(err);
      }
    });
  });
};

export default handleBrokerConnect;
