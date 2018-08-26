const chalk = require('chalk'); /* eslint-disable-line */
const Sequelize = require('sequelize');
require('dotenv').config();/* eslint-disable-line */

let url = process.env.DATABASE_URL || 'postgres://xyysiznlfvpqyk:f5337bcd7be3df2c8db2770998a2501402835edaba13821cc2762601cd7749ab@ec2-54-235-242-63.compute-1.amazonaws.com:5432/dbj72ec9b1uq8';

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
        // use snake_case column names
        underscored: true,
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
