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

module.exports = router;
