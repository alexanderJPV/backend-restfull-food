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

const sucursalCtrl = require('../controllers/sucursal.controller');
// router.get('/api/sucursales', auth.verifyToken, attachCurrentUser, sucursalCtrl.findAll);
router.get('/api/sucursales', auth.verifyToken, sucursalCtrl.findAll);
router.get('/api/sucursales/tipos', sucursalCtrl.findAllTipo);
router.get('/api/sucursales/:id', sucursalCtrl.findById);
// router.get('/api/sucursales-by-user', sucursalCtrl.findAllByUser)
router.post('/api/sucursales', auth.verifyToken, upload.single('imageUpload'), sucursalCtrl.create);
router.put('/api/sucursales', sucursalCtrl.update);
router.delete('/api/sucursales/:id', sucursalCtrl.delete);

// router.get('/api/usuarios', auth.verifyToken, attachCurrentUser, roleRequired('ROL_ADMIN'), usuarioCtrl.findAll);
// router.get('/api/usuarios/roles', auth.verifyToken, usuarioCtrl.findAllRol);
// router.post('/api/usuarios', auth.verifyToken, upload.single('imageUpload'), usuarioCtrl.create);
// router.put('/api/usuarios', auth.verifyToken, upload.single('imageUpload'), usuarioCtrl.update);
// router.get('/api/usuarios/:id', auth.verifyToken, usuarioCtrl.findById);
// router.delete('/api/usuarios/:id', auth.verifyToken, usuarioCtrl.delete);
// router.get('/api/roles', auth.verifyToken, usuarioCtrl.roles);
// router.post('/api/activate-account', usuarioCtrl.activateAccount);
// router.post('/api/reset-password-init', usuarioCtrl.resetPasswordInit);
// router.post('/api/reset-password-finish', usuarioCtrl.resetPasswordFinish);

module.exports = router;