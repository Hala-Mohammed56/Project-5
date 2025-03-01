export async function fetchTripData(city, date) {
    try {
        const response = await fetch('http://localhost:8080/getTrip', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ city, date })
        });

        if (!response.ok) throw new Error("Failed!");

        return await response.json();
    } catch (error) {
        console.error("Error:", error);
    }
}
