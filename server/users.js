const router = require('express').Router();

const db = require('../db'); /*eslint-disable-line */
const User = require('../db/models/user');

router.get('/', (req, res) => {
  User.findAll({ order: [['id', 'DESC']] })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch(error => console.error(error));
});

router.post('/', (req, res) => {
  User.create({
    title: req.body.title,
    name: req.body.name,
  })
    .then((result) => {
      res.status(201).send(result);
    })
    .catch(error => console.error(error));
});

router.patch('/:id', (req, res) => {
  User.update(
    { name: req.body.name },
    { where: { id: req.params.id } },
  ).then((updated) => {
    res.status(200).send(updated);
  });
});

router.delete('/:id', (req, res) => {
  User.destroy(
    { where: { id: req.params.id } },
  ).then(() => {
    res.status(200).send('deleted');
  });
});

router.get('/:id', (req, res) => {
  User.findOne({ where: { id: req.params.id } })
    .then((result) => {
      res.status(200).send(result);
    });
});

module.exports = router;
