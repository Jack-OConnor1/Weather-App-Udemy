const axios = require('axios');

const weatherstack_url = "http://api.weatherstack.com/current";
const weatherstack_access_key = "acc979f36f4570c0a0f0b4be46328d73";

const forecast = (latitude, longitude, callback) => {
    axios.get(weatherstack_url, { params: { access_key: weatherstack_access_key, query: `${latitude},${longitude}`, units: 'm'} })
    .then(({ data }) => {
        // weatherstack specific errors that didn't get thrown for some reason
        if (data.error) {
            // console.error(response.data.error.code);
            // console.error(response.data.error.type);
            // console.error(response.data.error.info);
            callback(`Error code ${data.error.code}. Info: ${data.error.info}`);
        } else {
            callback(undefined, {
                observation_time: data.current.observation_time,
                temperature: data.current.temperature,
                description: data.current.weather_descriptions.join(', '),
                location: data.location.name

            })
        };
    })
    .catch((error) => {
        // generic axios error handling
        if (error.response) {
            // console.error(error.response.data);
            // console.error(error.response.status);
            // console.error(error.response.headers);
            callback("Weather service could not process request", undefined);
        } else if (error.request) {
            // console.error(error.request);
            callback("Unable to connect to weather service.", undefined);
        } else {
            // console.error('System Error', error.message);
            callback("There is an error within the application.", undefined);
        }
    });
}

module.exports = forecast;