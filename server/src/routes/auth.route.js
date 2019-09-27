'use strict'

const express = require('express');
const router = express.Router();

const usuarioCtrl = require('../controllers/auth.controller');

router.post('/api/register', usuarioCtrl.signup);
router.post('/api/authenticate', usuarioCtrl.signin);

module.exports = router;