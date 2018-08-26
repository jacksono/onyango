const Sequelize = require('sequelize');
const db = require('../index.js');

const User = db.define(
  'users',
  {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    salary: {
      type: Sequelize.DOUBLE,
    },

    description: {
      type: Sequelize.TEXT,
    },
  },
);

module.exports = User;
