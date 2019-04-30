const knex = require('knex')
const router = require('express').Router();

const knexConfig = {
  client: 'sqlite3',
  connection: {
    filename: './data/roles_db.db3'
  },
  useNullAsDefault: true
}
const db = knex(knexConfig)

router.get('/', (req, res) => {
  db('roles')
    .then(roles => res.status(200).json(roles))
    .catch(err => console.log(err))
});

router.get('/:id', (req, res) => {
  const { id } = req.params
  db('roles')
    .where({ id: id })
    .first()
    .then(role => {
      role ?
        res.status(200).json(role)
        :
        res.status(404).json({
          message: 'No role exists with the id provided'
        })
    })
    .catch(err => {
      res.status(500).json(err)
    })
});

router.post('/', (req, res) => {
  db('roles')
    .insert(req.body, 'id')
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json(err)
    })
});

router.put('/:id', (req, res) => {
  // update roles
  res.send('Write code to modify a role');
});

router.delete('/:id', (req, res) => {
  // remove roles (inactivate the role)
  res.send('Write code to remove a role');
});

module.exports = router;
