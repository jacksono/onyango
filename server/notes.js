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
      return res.status(401).send({ message: err });
    }
    return User.findOne({ where: { id: payload.sub } })
      .then((user) => {
        req.viewerId = user.id;
        next();
      })
      .catch(error => console.error('Error:', error));
  });
};

router.get('/', ensureAuthenticated, (req, res) => {
  // where: { userId: req.viewerId },
  Note.findAll({ order: [['id', 'DESC']] })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch(error => console.error(error));
});

router.delete('/:id', ensureAuthenticated, (req, res) => {
  Note.findById(parseInt(req.params.id))
    .then((note) => {
      if (note && note.userId !== req.viewerId) {
        return res.status(403).send({ message: 'Permission Denied' });
      }
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
});

router.post('/', ensureAuthenticated, (req, res) => {
  Note.create({
    title: req.body.title,
    content: req.body.content,
    userId: req.body.userId,
  })
    .then((response) => {
      res.status(201).send(response);
    })
    .catch(error => console.error(error));
});

router.patch('/:id', ensureAuthenticated, (req, res) => {
  Note.findById(parseInt(req.params.id))
    .then((note) => {
      if (note && note.userId !== req.viewerId) {
        return res.status(403).send({ message: 'Permission Denied' });
      }
      Note.update(
        { title: req.body.title, content: req.body.content },
        { where: { id: req.params.id } },
      )
        .then((response) => {
          res.status(200).send(response);
        })
        .catch(error => console.error(error));
    });
});

router.get('/:id', ensureAuthenticated, (req, res) => {
  Note.findOne({ where: { id: req.params.id } })
    .then((note) => {
      if (note && note.userId !== req.viewerId) {
        return res.status(403).send({ message: 'Permission Denied' });
      }
      res.status(200).send(note);
    })
    .catch(error => console.error(error));
});

module.exports = router;
