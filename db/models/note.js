const Sequelize = require('sequelize');
const db = require('../index.js');

const Note = db.define(
  'notes',
  {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    content: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  },
);

module.exports = Note;
