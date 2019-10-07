'use strict'

const express = require('express');
const router = express.Router();
const multer = require('multer');
const auth = require('../services/auth.service');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '././uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
})

const upload = multer({ storage: storage });

const usuarioCtrl = require('../controllers/usuario.controller');

router.get('/api/usuarios', auth.verifyToken, usuarioCtrl.findAll);
router.post('/api/usuarios', auth.verifyToken, upload.single('imageUpload'), usuarioCtrl.create);
router.put('/api/usuarios', auth.verifyToken, upload.single('imageUpload'), usuarioCtrl.update);
router.get('/api/usuarios/:id', auth.verifyToken, usuarioCtrl.findById);
router.delete('/api/usuarios/:id', auth.verifyToken, usuarioCtrl.delete);
router.get('/api/roles', auth.verifyToken, usuarioCtrl.roles);

router.post('/api/reset-password-init', usuarioCtrl.resetPasswordInit);
router.post('/api/reset-password-finish', usuarioCtrl.resetPasswordFinish);

module.exports = router;