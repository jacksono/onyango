const router = require('express').Router();
const authConfig = require('./authConfig');

const db = require('../db'); /*eslint-disable-line */
const Note = require('../db/models/note');
const User = require('../db/models/user');

const ensureAuthenticated = (req, res, next) => {
  if (!(req.headers && req.headers.authorization)) {
    return res.status(401).send({ message: 'Please log in to access this page' });
  }

  const header = req.headers.authorization.split(' ');
  const token = header[1];
  authConfig.decodeToken(token, (err, payload) => {
    if (err) {
      return res.status(401).send({ Message: err });
    }
    return User.findOne({ where: { id: payload.sub } })
      .then((user) => {
        next();
      })
      .catch(error => console.error('Error:', error));
  });
};

router.get('/', ensureAuthenticated, (req, res) => {
  Note.findAll({ order: [['id', 'DESC']] })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch(error => console.error(error));
});

router.delete('/:id', ensureAuthenticated, (req, res) => {
  if (req.params.id) {
    Note.destroy({ where: { id: req.params.id } })
      .then(() => {
        res.status(200).send({ message: 'Note deleted' });
      })
      .catch(error => console.error(error));
  } else {
    res.status(400).send({ message: 'Invalid or missing parameter' });
  }
});

router.post('/', ensureAuthenticated, (req, res) => {
  Note.create({
    title: req.body.title,
    content: req.body.content,
  })
    .then((response) => {
      res.status(201).send(response);
    })
    .catch(error => console.error(error));
});

router.put('/:id', ensureAuthenticated, (req, res) => {
  Note.update(
    { title: req.body.title, content: req.body.content },
    { where: { id: req.params.id } },
  )
    .then((response) => {
      res.status(200).send(response);
    })
    .catch(error => console.error(error));
});

router.get('/:title', ensureAuthenticated, (req, res) => {
  Note.findOne({ where: { title: req.params.title } })
    .then((response) => {
      res.status(200).send(response);
    })
    .catch(error => console.error(error));
});

module.exports = router;
