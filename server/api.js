const express = require('express');
const users = require('./users');


const api = express.Router();
api.get('/', (req, res) => res.send({ message: 'Success!' }));
api.use('/users', users);

// No routes matched .
api.use((req, res) => res.status(404).end());


module.exports = api;
