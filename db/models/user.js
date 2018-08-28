const Sequelize = require('sequelize');
const db = require('../index.js');

const User = db.define(
  'users',
  {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    role: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'user',
    },
  },
);

module.exports = User;
