const router = require('express').Router();

const db = require('../db'); /*eslint-disable-line */
const Note = require('../db/models/note');

router.get('/', (req, res) => {
  Note.findAll({ order: [['id', 'DESC']] })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch(error => console.error(error));
});

router.delete('/:id', (req, res) => {
  if (req.params.id) {
    Note.destroy({ where: { id: req.params.id } })
      .then(() => {
        res.status(200);
      })
      .catch(error => console.error(error));
  } else {
    res.status(400).send({ message: 'Invalid or missing parameter' });
  }
});


module.exports = router;
