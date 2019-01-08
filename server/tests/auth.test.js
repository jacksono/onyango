
const request = require('supertest');
const app = require('../app');

const User = require('../../db/models/user');
/* eslint no-undef:0 */

describe('Test the auth routes', () => { /* eslint-disable-line */
  beforeAll((done) => {
    User.sync({ force: true })
      .then(() => {
        User.create({ username: 'Bob', password: 'pass123' });
        done();
      });
  });

  test('User can be registered', () => { /* eslint-disable-line */
    const payload = { username: 'Jane', password: 'pass123' };
    return request(app).post('/api/auth/register').send(payload)
      .then((response) => {
        expect(response.statusCode).toBe(201);
      });
  });

  test('User can not register with an existing username', () => { /* eslint-disable-line */
    const payload = { username: 'Bob', password: 'pass123' };
    return request(app).post('/api/auth/register').send(payload)
      .then((response) => {
        expect(response.statusCode).toBe(409);
      });
  });

  test('Registered user added in the db', () => { /* eslint-disable-line */
    User.findOne({ where: { username: 'Jane' } })
      .then((user) => {
        expect(user.username).toBe('Jane');
      });
  });

  test('User can sign in', () => { /* eslint-disable-line */
    const payload = { username: 'Jane', password: 'pass123' };
    return request(app).post('/api/auth/signIn').send(payload)
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });

  test('Non registered user cannot  sign in', () => { /* eslint-disable-line */
    const payload = { username: 'Dan', password: 'pass123' };
    return request(app).post('/api/auth/signIn').send(payload)
      .then((response) => {
        expect(response.statusCode).toBe(404);
      });
  });

  test('User cannot sign in with wrong password', () => { /* eslint-disable-line */
    const payload = { username: 'Bob', password: 'pass1234' };
    return request(app).post('/api/auth/signIn').send(payload)
      .then((response) => {
        expect(response.statusCode).toBe(401);
      });
  });

  test('Token generated for registered user', () => { /* eslint-disable-line */
    const payload = { username: 'Sam', password: 'pass123' };
    return request(app).post('/api/auth/register').send(payload)
      .then((response) => {
        expect(response.body.token).toBeTruthy();
      });
  });
});
