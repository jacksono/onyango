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
  if (!(req.body.username && req.body.password)) {
    res.status(400).send({ message: 'Missing argument(s)' });
    return;
  }
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
    .catch((error) => {
      console.error(error);
      res.status(500).send({ message: 'Server Error' });
    });
});

router.post('/signin', (req, res) => {
  User.findOne({ where: { username: req.body.username } })
    .then((user) => {
      if (!user) {
        res.status(401).send({ message: 'Invalid Credentials' });
        return;
      }
      verifyPassword(req.body.password, user.password);
      return user;
    })
    .then((user) => {
      return [localAuth.encodeToken(user), user.id];
    })
    .then((arr) => {
      res.status(200).send({
        message: 'Signed in Successfully',
        username: req.body.username,
        id: arr[1],
        token: arr[0],
      });
    })
    .catch((error) => {
      if (error.message === 'Wrong Password') {
        res.status(401).send({ message: 'Invalid Credentials' });
        console.error(error);
      }
    });
});

module.exports = router;
