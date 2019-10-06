'use strict'

const express = require('express');
const router = express.Router();
const auth = require('../services/auth.service');

const usuarioCtrl = require('../controllers/auth.controller');

router.post('/api/register', usuarioCtrl.signup);
router.post('/api/authenticate', usuarioCtrl.signin);
router.get('/api/account', auth.verifyToken, usuarioCtrl.account);

module.exports = router;