import { countdown } from './helpers';

export function updateUI(data) {
    if (!data) return;

    const resultDiv = document.getElementById('trip-results');
    resultDiv.innerHTML = `
        <h2>Trip to ${data.city}</h2>
        <p>Weather: ${data.weather.description}, ${data.weather.temp}°C</p>
        <p>Trip Countdown: ${countdown(data.date)}</p>
        <img src="${data.image}" alt="${data.city}" />
        <button id="delete-trip">Remove Trip</button>
    `;

    // Remove event listener
    document.getElementById('delete-trip').addEventListener('click', () => {
        localStorage.removeItem('trip');
        resultDiv.innerHTML = '';
    });
}
