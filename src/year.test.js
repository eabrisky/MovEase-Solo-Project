// Write a function that takes in a year and
// returns a boolean indicating if the year is a leap year.
// Years that are divisible by 4 are leap years,
// but years that are divisible by 100 are not leap years,
// but years that are divisible by 400 are leap years.

import leapYear from'./year.js';

test('DIVISIBLE BY 4', () => {
    expect(leapYear(12)).toBe(true);
})

test('DIVISIBLE BY 100', () => {
    expect(leapYear(500)).toBe(false);
})

test('DIVISIBLE BY 400', () => {
    expect(leapYear(1200)).toBe(true);
})