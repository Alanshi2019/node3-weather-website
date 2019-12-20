const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiYWxhbjIwMTkiLCJhIjoiY2s0Ymh0ZHI5MDBzdDNwcGdzdTc2ZWU0eCJ9.EUT-0qFoyYQelSycWxCq4w&limit=1";
  request({ url: url, json: true }, (err, res) => {
    if (err) {
      callback("Unable to connect to location services!", undefined);
    } else if (res.body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      const { center, place_name } = res.body.features[0];
      callback(undefined, {
        longitude: center[0],
        latitude: center[1],
        location: place_name
      });
    }
  });
};

module.exports = geocode;
