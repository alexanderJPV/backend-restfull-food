'use strict'

const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
})

const upload = multer({ storage: storage });

const usuarioCtrl = require('../controllers/usuario.controller');

router.get('/api/usuarios', usuarioCtrl.findAll);
router.post('/api/usuarios', upload.single('imageUpload'), usuarioCtrl.create);
router.put('/api/usuarios', upload.single('imageUpload'), usuarioCtrl.update);
router.get('/api/usuarios/:id', usuarioCtrl.findById);
router.delete('/api/usuarios/:id', usuarioCtrl.delete);

router.post('/api/reset-password-init', usuarioCtrl.resetPasswordInit);
router.post('/api/reset-password-finish', usuarioCtrl.resetPasswordFinish);

module.exports = router;