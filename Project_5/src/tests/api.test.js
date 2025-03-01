import { fetchTripData } from '../src/client/js/app';

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({
            city: "Paris",
            date: "2025-06-15",
            weather: { description: "Sunny", temp: 25 },
            image: "https://pixabay.com/paris.jpg"
        })
    })
);

test("Fetch trip data from API", async () => {
    const data = await fetchTripData("Paris", "2025-06-15");
    expect(data.city).toBe("Paris");
    expect(data.weather.description).toBe("Sunny");
    expect(data.image).toContain("pixabay.com");
});
