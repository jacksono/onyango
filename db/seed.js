const db = require('../db');

const seedUsers = () => db.Promise.map([
  {
    title: 'Sir',
    name: 'Mayombo Charles',
    salary: 50000,
    description: 'A good fellow',
    age: 27,
  },
  {
    title: 'Madam',
    name: 'Benneth Neima',
    salary: 60000,
    description: 'A lucky lady',
    age: 29,
  },
], user => db.model('users').create(user));


db.didSync
  .then(() => db.sync({ force: true }))
  .then(seedUsers)
  .then(users => console.log(`Seeded ${users.length} users OK`))
  .catch(error => console.error(error))
  .finally(() => db.close());
