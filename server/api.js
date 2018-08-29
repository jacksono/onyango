const express = require('express');
const notes = require('./notes');
const auth = require('./auth');

const api = express.Router();
api.get('/', (req, res) => res.send({ message: 'Success!' }));
api.use('/notes', notes);
api.use('/auth', auth);

// No routes matched .
api.use((req, res) => res.status(404).end());


module.exports = api;
