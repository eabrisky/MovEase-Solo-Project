// - If the number is divisible by 3, return "Fizz". 
// - If the number is divisible by 5, return "Buzz". 
// - If the number is divisible by both 3 and 5, return "FizzBuzz". 
// - Otherwise, just return the number that was passed into the function.

import dividend from './numbers.js';

test('DIVISIBLE BY 3', () => {
    expect(dividend(9)).toBe('Fizz');
}) // end divisible by 3 test

test('DIVISIBLE BY 5', () => {
    expect(dividend(10)).toBe('Buzz');
}) // end divisible by 5 test

test('DIVISIBLE BY BOTH 3 AND 5', () => {
    expect(dividend(15)).toBe('FizzBuzz');
}) // end divisible by both 3 and 5 test

test('NOT DIVISIBLE BY 3, 5, OR BOTH', () => {
    expect(dividend(1)).toBe(1);
}) // end not divisible test