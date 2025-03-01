import { countdown } from '../src/client/js/helpers';

test("Countdown function returns correct days", () => {
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + 10);

    const daysLeft = countdown(futureDate.toISOString().split('T')[0]);
    expect(daysLeft).toBe("10 days away");
});
