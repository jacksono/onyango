const express = require('express');
const users = require('./users');
const notes = require('./notes');


const api = express.Router();
api.get('/', (req, res) => res.send({ message: 'Success!' }));
api.use('/users', users);

api.use('/notes', notes);

// No routes matched .
api.use((req, res) => res.status(404).end());


module.exports = api;
