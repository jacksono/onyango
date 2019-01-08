const bcrypt = require('bcryptjs');
const db = require('../db');

/* eslint no-console:0 */
const seedUsers = () => db.Promise.map([
  {
    username: 'admin',
    password: bcrypt.hashSync('email@email.com', bcrypt.genSaltSync()),
  },
  {
    username: 'medsender',
    password: bcrypt.hashSync('email@email.com', bcrypt.genSaltSync()),
  },
], user => db.model('users').create(user));

const seedNotes = () => db.Promise.map([
  {
    title: 'Assesment',
    content: 'This is the content for the assesment note',
    userId: 1,
  },
  {
    title: 'The world of PREN',
    content: 'Postgres, React, Express, Node',
    userId: 2,
  },
  {
    title: 'Assesment2',
    content: 'This is the content for the assesment note',
    userId: 1,
  },
  {
    title: 'The world of PREN2',
    content: 'Postgres, React, Express, Node',
    userId: 2,
  },
  {
    title: 'Assesment3',
    content: 'This is the content for the assesment note',
    userId: 1,
  },
  {
    title: 'The world of PREN3',
    content: 'Postgres, React, Express, Node',
    userId: 2,
  },
  {
    title: 'Assesment4',
    content: 'This is the content for the assesment note',
    userId: 1,
  },
  {
    title: 'The world of PREN4',
    content: 'Postgres, React, Express, Node',
    userId: 2,
  },
  {
    title: 'Assesment5',
    content: 'This is the content for the assesment note',
    userId: 1,
  },
  {
    title: 'The world of PREN5',
    content: 'Postgres, React, Express, Node',
    userId: 2,
  },
], note => db.model('notes').create(note));


db.didSync
  .then(() => db.sync({ force: true }))
  .then(seedUsers)
  .then(users => console.log(`Seeded ${users.length} users OK`))
  .then(seedNotes)
  .then(notes => console.log(`Seeded ${notes.length} notes OK`))
  .catch(error => console.error(error))
  .finally(() => db.close());
