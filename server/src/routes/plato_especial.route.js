'use strict'

const express = require('express');
const router = express.Router();
const multer = require('multer');
const auth = require('../services/auth.service');
const roleRequired = require('../_helpers/roleRequired');
// const attachCurrentUser = require('../_helpers/attachCurrentUser');
// const attachCurrentUser = require('../_helpers/attachCurrentUser');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '././uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
})

const upload = multer({ storage: storage });

const platoEspCtrl = require('../controllers/plato_especial.controller');
router.get('/api/platos', platoEspCtrl.findAll);

module.exports = router;