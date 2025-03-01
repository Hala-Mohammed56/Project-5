import { fetchTripData } from './js/app';
import { updateUI } from './js/ui';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.scss';
import 'bootstrap';

const $ = require("jquery");

const trip = {};

const handleSearch = async (event) => {
    event.preventDefault();

    trip.city = document.getElementById('destination').value;
    trip.start = document.getElementById('departure-date').value;

    const tripData = await fetchTripData(trip.city, trip.start);

    if (tripData) {
        trip.weather = tripData.weather;
        trip.image = tripData.image;
        trip.country = tripData.country;
        trip.countryFlag = tripData.countryFlag;

        console.log(trip);
        updateUI(trip);
    }
};

const handleCancel = (event) => {
    event.preventDefault();
    $('#tripModal').modal('toggle');
    document.querySelector('.caption').style.display = 'block';
};

/* Add event listeners */
document.getElementById('button_search').addEventListener('click', handleSearch);
document.querySelectorAll('.trip_cancel').forEach(element => {
    element.addEventListener('click', handleCancel);
});
