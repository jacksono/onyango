const router = require('express').Router();
const authConfig = require('./authConfig');

const db = require('../db'); /*eslint-disable-line */
const Note = require('../db/models/note');
const User = require('../db/models/user');

/* eslint no-console: 0 */
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
  if (req.query.q && req.query.q === 'all') {
    Note.findAll({ order: [['id', 'DESC']] })
      .then((result) => {
        res.status(200).send(result);
      })
      .catch(error => console.error(error));
  } else {
    Note.findAll({ where: { userId: req.viewerId }, order: [['id', 'DESC']] })
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => {
        res.status(500).send({ message: 'Internal Server Error' });
        console.error(error);
      });
  }
});

router.delete('/:id', ensureAuthenticated, (req, res) => {
  Note.findById(parseInt(req.params.id))
    .then((note) => {
      if (!note) {
        return res.status(404).send({ message: 'Note does not exist' });
      }
      if (note.userId !== req.viewerId) {
        return res.status(403).send({ message: 'Permission Denied' });
      }
      if (req.params.id) {
        Note.destroy({ where: { id: req.params.id } })
          .then(() => {
            res.status(200).send({ message: 'Note deleted' });
          })
          .catch((error) => {
            res.status(500).send({ message: 'Internal Server Error' });
            console.error(error);
          });
      } else {
        res.status(400).send({ message: 'Invalid or missing parameter' });
      }
    })
    .catch((error) => {
      res.status(500).send({ message: 'Internal Server Error' });
      console.error(error);
    });
});

router.post('/', ensureAuthenticated, (req, res) => {
  const Exp = /^([0-9]+[\s]*|[a-z]+[\s]*)+([0-9a-z]+)$/i;
  if (!req.body.title.match(Exp)) {
    res.status(400).send({ message: 'Title can only contain letters and numbers' });
    return;
  }
  Note.create({
    title: req.body.title,
    content: req.body.content,
    userId: req.body.userId,
  })
    .then((response) => {
      res.status(201).send(response);
    })
    .catch((error) => {
      if (error.constructor.name === 'UniqueConstraintError') {
        res.status(409).send({ message: 'Title Already Used' });
      } else {
        res.status(500).send({ message: 'Internal Server Error' });
      }
      console.error(error);
    });
});

router.patch('/:id', ensureAuthenticated, (req, res) => {
  const Exp = /^([0-9]+[\s]*|[a-z]+[\s]*)+([0-9a-z]+)$/i;
  Note.findById(parseInt(req.params.id))
    .then((note) => {
      if (!note) {
        return res.status(404).send({ message: 'Note does not exist' });
      }
      if (note.userId !== req.viewerId) {
        return res.status(403).send({ message: 'Permission Denied' });
      }
      if (!req.body.title.match(Exp)) {
        res.status(400).send({ message: 'Title can only contain letters and numbers' });
        return;
      }
      Note.update(
        { title: req.body.title, content: req.body.content },
        { where: { id: req.params.id } },
      )
        .then((response) => {
          res.status(200).send(response);
        })
        .catch((error) => {
          if (error.constructor.name === 'UniqueConstraintError') {
            res.status(409).send({ message: 'Title Already Used' });
          } else {
            res.status(500).send({ message: 'Internal Server Error' });
          }
          console.error(error);
        });
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
