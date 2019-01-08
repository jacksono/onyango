
const request = require('supertest');
const app = require('../app');
const Note = require('../../db/models/note');
const User = require('../../db/models/user');
/* eslint no-undef:0 */

let token;

beforeAll((done) => {
  User.sync({ force: true })
    .then(() => {
      request(app)
        .post('/api/auth/register')
        .send({
          username: 'Jane',
          password: 'pass123',
        })
        .end((err, response) => {
          token = response.body.token; /* eslint-disable-line */
          User.create({ username: 'Bobu', password: 'pass123' });
          Note.sync({ force: true })
            .then(() => {
              Note.create({ title: 'Title', content: 'content', userId: 2 });
              done();
            });
        });
    });
});

describe('Test the notes routes', () => { /* eslint-disable-line */

  test('User can create a note', () => { /* eslint-disable-line */
    const payload = { title: 'Title1', content: 'content1', userId: 1 };
    return request(app)
      .post('/api/notes')
      .send(payload)
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(201);
      });
  });

  test('User can retrieve own note', () => { /* eslint-disable-line */
    return request(app)
      .get('/api/notes/2')
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });

  test('User cannot delete a note they dont own', () => { /* eslint-disable-line */
    return request(app)
      .delete('/api/notes/1')
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(403);
      });
  });

  test('User cannot edit a note that does not exist', () => { /* eslint-disable-line */
    return request(app)
      .patch('/api/notes/99')
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(404);
      });
  });
});
