'use strict'

const db = require('../../db');
const bcrypt = require('bcrypt');
const control = require('../_helpers/pagination');
const roles = require('../_helpers/role');
const Usuario = db.usuario;

const usuarioCtrl = {};

usuarioCtrl.findAllRol = (req, res) => {
    const rol = req.params.rol;
    Usuario.findAll({ where: { rol: [rol] } })
        .then((usuario) => {
            res.status(200).json(usuario);
        }).catch((err) => {
            res.status(300).json({ msg: 'error', details: err });
        });
}

usuarioCtrl.findAll = (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 0;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
    const offset = page * pageSize;
    const limit = offset + pageSize;
    // 0 * 10 = 0
    // 0 + 10 = 10
    // 1 * 10 = 10
    // 10 + 10 = 20
    // 2 * 10 = 20
    // 20 + 10 = 30
    const value = req.query.sort ? req.query.sort : 'id';
    const type = req.query.type ? req.query.type.toUpperCase() : 'ASC';
    console.log('--------------------------------------------------------------');
    console.log('--------------------------------------------------------------');
    console.log('Page --> ', page);
    console.log('PageSize --> ', pageSize);
    console.log('Offset --> ', offset);
    console.log('Limit --> ', limit);
    console.log('--------------------------------------------------------------');
    console.log('--------------------------------------------------------------');
    Usuario.findAndCountAll({ offset: parseInt(offset), limit: parseInt(pageSize), order: [[value, type]] }).
        then((usuario) => {
            const pages = Math.ceil(usuario.count / limit);
            const elements = usuario.count;
            res.status(200).json(
                {
                    elements,
                    page,
                    pageSize,
                    pages,
                    usuario,
                }
            );
        }).catch(err => {
            console.log(err);
            res.status(500).json({ msg: "error", details: err });
        });
}

usuarioCtrl.create = (req, res) => {
    console.log('---------------------------------------------------');
    console.log('---------------------------------------------------');
    console.log(req.body);
    console.log('---------------------------------------------------');
    console.log('---------------------------------------------------');
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        const datas = Object.assign({}, req.body);
        const urimage=``;
        if(req.body.imagen!=null){
            urimage=`http://localhost:3000/${req.file.path}`;
        }
        const newUser = {
            id: null,
            nombres: datas.nombres,
            apellidos: datas.apellidos,
            email: datas.email,
            userName: datas.userName,
            password: hash,
            rol: [req.body.rol],
            estado: datas.estado,
            imagen: urimage,
            name: datas.name,
            type: datas.type,
            genero: datas.genero,
            telefono: datas.telefono,
            fechaNacimiento: datas.fechaNacimiento
        };
        Usuario.create(newUser).
            then((usuario) => {
                res.status(200).json(usuario);
            }).catch((err) => {
                res.status(500).json({ msg: 'error', details: err });
            });
    });
}

usuarioCtrl.update = (req, res) => {
    const datas = Object.assign({}, req.body);
    const newUser = {
        id: datas.id,
        nombres: datas.nombres,
        apellidos: datas.apellidos,
        email: datas.email,
        userName: datas.userName,
        password: datas.password,
        rol: [req.body.rol],
        estado: datas.estado,
        imagen: req.file ? `http://localhost:3000/${req.file.path}` : datas.imagen,
        name: datas.name,
        type: datas.type,
        genero: datas.genero,
        telefono: datas.telefono,
        fechaNacimiento: datas.fechaNacimiento
    }
    Usuario.update(newUser, { where: { id: newUser.id } }).
        then((usuario) => {
            res.status(200).json(usuario);
        }).catch((err) => {
            res.status(500).json({ msg: 'error', details: err });
        });
}

usuarioCtrl.findById = (req, res) => {
    const id = req.params.id;
    Usuario.findOne({ where: { id: id } }).
        then((usuario) => {
            res.status(200).json(usuario);
        }).catch((err) => {
            res.status(300).json({ msg: 'error', details: err });
        });
}

usuarioCtrl.delete = (req, res) => {
    const id = req.params.id;
    Usuario.destroy({ where: { id: id } }).
        then(() => {
            res.status(200).json({ msg: 'deleted successfully -> curstomer id = ', id });
        }).catch((err) => {
            res.status(300).json({ msg: 'error', details: err });
        });
}

usuarioCtrl.resetPasswordInit = (req, res) => {
    const email = req.body.email;
    const refreshToken = cryptoRandomString({ length: 50, type: 'base64' });
    Ususario.findOne({ where: { email: email } }).then((usuario) => {
        const url = 'http://localhost:4200/reset-password-finish/';
        mail.sendMail('/html/resetPassword.html', 'Recuperar Contraseña', url + refreshToken, usuario);
        res.status(200).json({ key: "Esta es la llave que se mandara" });
        const data = usuario.dataValues;
        data.reset_key = refreshToken;
        Usuario.update(data, { where: { id: usuario.id } }).then(() => {
            console.log('Se le envio una URL');
            res.status(200).json('Your account was updated successfully');
        });
    }).catch((err) => {
        res.status(500).json({ msg: 'error', details: err });
    });
}

usuarioCtrl.resetPasswordFinish = (req, res) => {
    const key = req.body.key;
    const newPassword = req.body.newPassword;
    Usuario.findOne({ where: { reset_key: key } }).
        then((usuario) => {
            bcrypt.hash(newPassword, 10, function (err, hash) {
                const data = usuario.dataValues;
                data.reset_key = null;
                data.password = hash;
                Usuario.update(data, { where: { id: data.id } }).then(() => {
                    console.log('La contrasenia fue actualizada exitosamente');
                    res.status(200).json('Your account was updated successfully');
                });
            });
        }).catch((err) => {
            res.status(500).json({ msg: 'error', details: err });
        });
}

usuarioCtrl.activateAccount = (req, res, next) => {
    const key = req.body.key;
    Usuario.findOne({ where: { activate_key: key } }).then(
        (usuario) => {
            console.log('======================================');
            console.log('======================================');
            console.log(usuario.dataValues);
            console.log('======================================');
            console.log('======================================');
            Usuario.update(usuario.dataValues, { where: { id: usuario.dataValues.id } }).then(() => {
                console.log('----------------------------------');
                res.status(200).send('hola');
            }).cath((errOne) => {
                console.log("---------- el rror 1-------------");
                res.status(403).send({ msg: 'error', details: errOne });
            });
        }).catch((errTwo) => {
            console.log("---------- el rror 2-------------");
            res.status(500).send({ msg: 'error', details: errTwo });
        });
    return next();
}

usuarioCtrl.roles = async (req, res) => {
    await res.status(200).json(roles);
}

module.exports = usuarioCtrl;