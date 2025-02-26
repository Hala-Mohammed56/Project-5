const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('dist')); 

// Store trip data
let tripData = {};

// API Routes
app.post('/getTrip', async (req, res) => {
    const { city, date } = req.body;

    try {
        const location = await getCoordinates(city);
        if (!location) throw new Error("Location not found");

        const weather = await getWeather(location.lat, location.lng);
        if (!weather) throw new Error("Weather data not found");

        const image = await getImage(city);

        // Store the trip data
        tripData = {
            city,
            date,
            weather,
            image
        };

        res.json(tripData);
    } catch (error) {
        console.error("Error fetching trip data:", error);
        res.status(500).json({ error: error.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

//Get Coordinates from Geonames API
async function getCoordinates(city) {
    const geoURL = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${process.env.GEONAMES_USER}`;
    
    try {
        const response = await fetch(geoURL);
        const data = await response.json();
        if (data.geonames.length > 0) {
            return {
                lat: data.geonames[0].lat,
                lng: data.geonames[0].lng
            };
        }
    } catch (error) {
        console.error("Geonames API error:", error);
    }
    return null;
}

//Get Weather from Weatherbit API
async function getWeather(lat, lon) {
    const weatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHERBIT_KEY}`;
    
    try {
        const response = await fetch(weatherURL);
        const data = await response.json();
        return data.data[0]; // Return first day forecast
    } catch (error) {
        console.error("Weatherbit API error:", error);
    }
    return null;
}

// Get Image from Pixabay API
async function getImage(city) {
    const imageURL = `https://pixabay.com/api/?key=${process.env.PIXABAY_KEY}&q=${city}&image_type=photo`;

    try {
        const response = await fetch(imageURL);
        const data = await response.json();
        return data.hits.length ? data.hits[0].webformatURL : 'https://via.placeholder.com/400';
    } catch (error) {
        console.error("Pixabay API error:", error);
    }
    return 'https://via.placeholder.com/400';
}
