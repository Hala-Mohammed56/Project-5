export function countdown(date) {
    const tripDate = new Date(date);
    const today = new Date();
    const diff = Math.ceil((tripDate - today) / (1000 * 60 * 60 * 24));
    return diff > 0 ? `${diff} days away` : "Trip has passed!";
}
