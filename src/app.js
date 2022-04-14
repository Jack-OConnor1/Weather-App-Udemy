const path = require('path');
const express = require('express');
const hbs = require('hbs');

const port = process.env.PORT || 3000;

const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const public_directory_path = path.join(__dirname, '../public');
const views_directory_path = path.join(__dirname, '../templates/views');
const partials_directory_path = path.join(__dirname, '../templates/partials');

const app = express();

app.set('view engine', 'hbs');
app.set('views', views_directory_path);
app.use(express.static(public_directory_path));
hbs.registerPartials(partials_directory_path);

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Jack"
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide a location to search"
        });
    }

    address = encodeURIComponent(req.query.address);
    geocode(address, (error, { latitude, longitude, location } = {}) => {  // destructuring geo_data object
        if (error) {
            return res.send({ error });
        }
        
        forecast(latitude, longitude, (error, { location: weather_location, observation_time, description, temperature} = {}) => {  // rename weather_data.location
            if (error) {
                return res.send({ error });
            }
            res.send({
                location,
                description,
                observation_time,
                temperature,
                units: "Celsius"
            });
        });
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        name: "Jack",
        title: "Help", 
        msg: "Come here to find help."
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        name: "Jack",
        title: "About",
        msg: "Come here to find out about us."
    });
});

app.get('/help/*', (req, res) => {
    res.render('invalid_url', {
        error: "Please try searching for a help article using our search function",
        title: "Error 404",
        name: "Jack"
    });
});

app.get('*', (req, res) => {
    res.render('invalid_url', {
        error: "This page doesn't exist!",
        title: "Error 404",
        name: "Jack"
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});