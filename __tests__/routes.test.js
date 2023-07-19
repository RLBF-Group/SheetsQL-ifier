// import routers/endpoints from files throughout the project to test them here
// supertest will be a required for http request testing
const request = require('supertest');
const app = require('../server/server');

// *** REFER TO `server.js` TO MAKE SURE Application Default Credentials (ADC) ARE AUTHENTICATED ***

// Google API Authentication is essential to server-side operations in the application, but using Jest to mock that authentication here seemed to be unnecessary and inefficient. Google API docs will be of more help


describe("server endpoints", () => {
  let server;

  beforeAll(() => {
    server = app.listen(5555); //start server at PORT before tests
  })

  afterAll((done) => {
    if(server) {
    server.close(done) //close server after tests run
    } else {
      done();
    }
  });

  it('should start and listen at proper port', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(404);
    expect(res.text).toBe('Not Found');
  })
})