const router = require('express').Router();
const bcrypt = require('bcryptjs');
const localAuth = require('./authConfig');
const User = require('../db/models/user');

const verifyPassword = (userPassword, databasePassword) => {
  const bool = bcrypt.compareSync(userPassword, databasePassword);
  if (!bool) throw new Error('Wrong Password');
  else return true;
};

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

router.post('/signin', (req, res) => {
  User.findOne({ where: { username: req.body.username } })
    .then((user) => {
      verifyPassword(req.body.password, user.password);
      return user;
    })
    .then((user) => {
      return localAuth.encodeToken(user);
    })
    .then((token) => {
      res.status(200).send({
        message: 'Signed in Successfully',
        username: req.body.username,
        token,
      });
    })
    .catch(error => console.error(error));
});

module.exports = router;
