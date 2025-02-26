import { fetchTripData } from './js/app';
import { updateUI } from './js/ui';
import './styles/main.scss';
import '../client/styles/main.scss';


// Event listener
document.getElementById('trip-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const city = document.getElementById('destination').value;
    const departureDate = document.getElementById('departure-date').value;

    const tripData = await fetchTripData(city, departureDate);
    updateUI(tripData);
});
