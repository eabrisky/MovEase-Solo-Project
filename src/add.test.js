 // add two integers
 // add decimals
 // add negative
 // add string
 // one integer
 // string 'ten'

 // import function you made from 'add.js' to test it out here
 import sum from './add.js';

// word to make a test is test in jest
// takes in two parameters
// first is description/string you wanna print to console when you run test
// second is a callback function. this is the code that will run when you run the test
 test('Add 2 Integers', () => {
     // expect is a function meant to take in the code you write
     // the sum of 1 & 2, I wanna capture that value
     // and then we can do dot notation (.toBe(3)) off of it to expect some things of what 1 and 2 did
    expect(sum(1,2)).toBe(3);
 }) // end add 2 integers test

 // adding decimals test
 test('Adding Decimals', () => {
     expect(sum(1.2, 2.43)).toBe(3.63);
 }) // end decimal test

 // adding negatives
 test('Add Negatives', () => {
     expect(sum(-1, 3)).toBe(2);
 }) // end add negatives test

 // adding strings
 test('Add String', () => {
    expect(sum('1', '3')).toBe(4);
}) // end add string test

// adding one integer
test('Add One', () => {
    expect(sum(1)).toBe(1);
}) // end add one test

// adding string of 'ten' with integer
test('Add String Ten', () => {
    expect(sum('ten', 1)).toBe(NaN);
}) // end add string ten test

// run test in terminal console with 'npm run test'
// as you adjust add.js function, test will keep running in terminal console


// FAIL  src/add.test.js
// ✓ Add 2 Integers (1 ms)
// ✓ Adding Decimals
// ✓ Add Negatives
// ✕ Add String (1 ms)
// ✕ Add One
// ✕ Add String Ten

// ● Add String

//   expect(received).toBe(expected) // Object.is equality

//   Expected: 4
//   Received: "13"

//     32 |  // adding strings
//     33 |  test('Add String', () => {
//   > 34 |     expect(sum('1', '3')).toBe(4);
//        |                           ^
//     35 | }) // end add string test
//     36 |
//     37 | // adding one integer

//     at Object.<anonymous> (src/add.test.js:34:27)

// ● Add One

//   expect(received).toBe(expected) // Object.is equality

//   Expected: 1
//   Received: NaN

//     37 | // adding one integer
//     38 | test('Add One', () => {
//   > 39 |     expect(sum(1)).toBe(1);
//        |                    ^
//     40 | }) // end add one test
//     41 |
//     42 | // adding string of 'ten' with integer

//     at Object.<anonymous> (src/add.test.js:39:20)

// ● Add String Ten

//   expect(received).toBe(expected) // Object.is equality

//   Expected: NaN
//   Received: "ten1"

//     42 | // adding string of 'ten' with integer
//     43 | test('Add String Ten', () => {
//   > 44 |     expect(sum('ten', 1)).toBe(NaN);
//        |                           ^
//     45 | }) // end add string ten test
//     46 |
//     47 | // run test in terminal console with 'npm run test'

//     at Object.<anonymous> (src/add.test.js:44:27)

// Test Suites: 1 failed, 1 total
// Tests:       3 failed, 3 passed, 6 total
// Snapshots:   0 total
// Time:        0.891 s
// Ran all test suites related to changed files.

// Watch Usage
// › Press a to run all tests.
// › Press f to run only failed tests.
// › Press q to quit watch mode.
// › Press p to filter by a filename regex pattern.
// › Press t to filter by a test name regex pattern.
// › Press Enter to trigger a test run.