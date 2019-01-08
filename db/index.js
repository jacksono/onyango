const chalk = require('chalk'); /* eslint-disable-line */
const Sequelize = require('sequelize');
require('dotenv').config();/* eslint-disable-line */
/* eslint no-console:0 */
let url = process.env.DATABASE_URL;

if (process.env.NODE_ENV === 'test') {
  url = process.env.TEST_DATABASE_URL;
}

console.log(chalk.yellow(`Opening database connection to ${url}`));


// database instance
const db = new Sequelize(
  url,
  {
    logging: false,
    define:
      {
        // automatically include timestamp columns
        timestamps: true,
      },
  },
);

module.exports = db;

// pull in models
require('./models');

// sync the db
function sync(retries=0, maxRetries=5) { /* eslint-disable-line */
  return db.sync({ force: false })
    .then(() => console.log(`Synced models to db ${url}`))
    .catch((fail) => {
      console.log(fail);
    });
}

db.didSync = sync();
