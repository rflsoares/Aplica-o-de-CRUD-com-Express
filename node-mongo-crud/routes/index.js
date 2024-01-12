var express = require('express');
var router = express.Router();

const db = require('../db');

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const docs = await db.findAll();
    res.render('index', { title: 'Lista de Clientes', docs });
  } catch (error) {
    next(error);
  }
});

router.get('/new', (req, res, next) => {
  res.render('new', { title: 'Novo Cadastro', doc: {'name':'','age':''}, action: '/new' });
});

router.post('/new', async (req, res, next) => {
  const name = req.body.name;
  const age = parseInt(req.body.age);

  try {
    const result = await db.insert({ name, age });
    console.log(result);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
})

router.get('/edit/:id', async (req, res, next) => {
  const id = req.params.id;

  try {
    const doc = await db.findOne(id);
    res.render('new', { title: 'Edição de Cliente', doc, action: '/edit/' + doc._id});
  } catch (err) {
    next(err);
  }
})

router.post('/edit/:id', async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const age = parseInt(req.body.age);

  try {
    const result = await db.update(id, { name, age });
    console.log(result);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
})


module.exports = router;


