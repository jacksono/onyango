const bcrypt = require('bcryptjs');
const db = require('../../db');


/* eslint no-console:0 */
const testSetup = () => {
  const seedUsers = () => db.Promise.map([
    {
      username: 'user1',
      password: bcrypt.hashSync('pass1', bcrypt.genSaltSync()),
    },
    {
      username: 'user2',
      password: bcrypt.hashSync('pass2', bcrypt.genSaltSync()),
    },
  ], user => db.model('users').create(user));

  const seedNotes = () => db.Promise.map([
    {
      title: 'Note1',
      content: 'Content1',
      userId: 1,
    },
    {
      title: 'Note2',
      content: 'Content2',
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
};

module.export = testSetup;
