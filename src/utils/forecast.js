const request = require("request");

const forecast = (l1, l2, callback) => {
  const url =
    "https://api.darksky.net/forecast/425bc01be0368c9b8704232df07f49a0/" +
    l1 +
    "," +
    l2;
  request({ url: url, json: true }, (err, req) => {
    if (err) {
      callback("Unable to connect to weather service!", undefined);
    } else if (req.body.err) {
      callback("Unable to find that location.", undefined);
    } else {
      const { temperature, precipProbability } = req.body.currently;
      callback(
        undefined,
        `It is currently ${temperature} degress out. There is a ${precipProbability}% chance of rain.`
      );
    }
  });
};
module.exports = forecast;
