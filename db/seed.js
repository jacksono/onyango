const bcrypt = require('bcryptjs');
const db = require('../db');


const seedUsers = () => db.Promise.map([
  {
    username: 'Charles',
    password: bcrypt.hashSync('pass', bcrypt.genSaltSync()),
  },
  {
    username: 'Jane',
    password: bcrypt.hashSync('pass2', bcrypt.genSaltSync()),
  },
], user => db.model('users').create(user));

const seedNotes = () => db.Promise.map([
  {
    title: 'Assesment',
    content: 'This is the content for the assesment note',
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
