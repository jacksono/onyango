const router = require('express').Router();
const bcrypt = require('bcryptjs');
const localAuth = require('./authConfig');
const User = require('../db/models/user');

router.post('/register', (req, res) => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  User.create({
    username: req.body.username,
    password: hash,
  })
    .then((user) => {
      return localAuth.encodeToken(user);
    })
    .then((token) => {
      res.status(201).send({ message: 'Registered Successfully', token });
    })
    .catch(error => console.error(error));
});

module.exports = router;
