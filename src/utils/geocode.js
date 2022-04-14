const axios = require("axios");

const mapbox_access_key = "pk.eyJ1IjoiamFjay1vY29ubm9yIiwiYSI6ImNsMXE4YXl6aDFjd3EzanFyZWZ4cXI4ZmIifQ.WIqjhD4CFV0GN7Mh1mrrYQ";
const mapbox_base_url = "https://api.mapbox.com/geocoding/v5/mapbox.places/";

const geocode = (address, callback) => {
    let url = `${mapbox_base_url}${address}.json`;
    let options = { params: { access_token: mapbox_access_key } };
    axios.get(url, options)
        .then(({ data }) => {
            if (data.features.length === 0) {
                callback("Unable to find location. Try another search.", undefined);
            } else {
                callback(undefined, {
                    longitude: data.features[0].center[0],
                    latitude: data.features[0].center[1],
                    location: data.features[0].place_name
                });
            }
        })
        .catch((error) => { 
            if (error.response) {
                // Request made -> status outside 2xx range.
                console.error(error.response.data);
                console.error(error.response.status);
                console.error(error.response.headers);
                callback("Location service could not process request.", undefined);
            } else if (error.request) {
                // Request made -> got no response.
                console.error(error.request);
                callback("Unable to connect to location service.", undefined);
            } else {
                // An error occurred before the request could be sent
                console.error("System error", error.message);
                callback("There is a problem within the application.", undefined);
            }
        });
}

module.exports = geocode;