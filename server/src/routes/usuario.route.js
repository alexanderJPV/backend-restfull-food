'use strict'

const express = require('express');
const router = express.Router();

const usuarioCtrl = require('../controllers/usuario.controller');

router.get('/api/usuarios', usuarioCtrl.findAll);
router.post('/api/usuarios', usuarioCtrl.create);
router.put('/api/usuarios', usuarioCtrl.update);
router.get('/api/usuarios/:id', usuarioCtrl.findById);
router.delete('/api/usuarios/:id', usuarioCtrl.delete);

module.exports = router;