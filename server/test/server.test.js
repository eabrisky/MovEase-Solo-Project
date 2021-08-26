let app = require('../server');
// supertest allows us to test things with our server, kind of like postman
let testServer = require('supertest');

describe('Test ROOT path', () => {

    test('should return 200 for /api/user/logout', async () => {
        // (1) make request to server
        // (2) expect response we get to match certain criteria

        // make a request!
        const response = await testServer(app).post('/api/user/logout')
        // analyze response!
        expect(response.statusCode).toBe(200);
    })
    // you can also use 'it' instead of 'test'

})