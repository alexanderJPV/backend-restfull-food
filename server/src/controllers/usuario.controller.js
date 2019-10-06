'use strict'

const db = require('../../db');
const control = require('../_helpers/pagination');
const Usuario = db.usuario;

const usuarioCtrl = {};

usuarioCtrl.findAll = (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 0;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
    const offset = page * pageSize;
    const limit = offset + pageSize;
    const value = req.query.sort ? req.query.sort : 'id';
    const type = req.query.type ? req.query.type.toUpperCase() : 'ASC';
    Usuario.findAndCountAll({ offset, limit, order: [[value, type]] }).
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
    console.log('El resp ----> ', req.body.nombres);
    // console.log('------------->>>>>>>>>>>>>>>>>>>>>>>>> ', req.file.path);
    const datas = Object.assign({}, req.body);
    console.log('------->', datas);
    const newUser = {
        id: null,
        nombres: datas.nombres,
        apellidos: datas.apellidos,
        email: datas.email,
        userName: datas.userName,
        password: '1232323',
        role: ['USER'],
        estado: true,
        imagen: `http://localhost:3000/${req.file.path}`,
        name: datas.name,
        type: datas.type
    }
    Usuario.create(newUser).
        then((usuario) => {
            res.status(200).json(usuario);
        }).catch((err) => {
            res.status(500).json({ msg: 'error', details: err });
        });
}

usuarioCtrl.update = (req, res) => {
    const id = req.body.id;
    Usuario.update(req.body, { where: { id: id } }).
        then(() => {
            res.status(200).json(req.body);
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

usuarioCtrl.activateAccount = (req, res) => {
    const key = req.body.key;
    Usuario.findOne({ where: { activate_key: key } }).then(
        (usuario) => {
            const data = usuario.dataValues;
            data.status = true;
            data.activate_key = null;
            Usuario.update(data, { where: { id: data.id } }).then(() => {
                res.status(200).json({ key: 'The account was successfuly' });
            }).cath((err) => {
                res.status(500).json({ msg: 'error', details: err });
            })
        }).catch((err) => {
            res.status(200).json({ msg: 'error', details: err });
        })
}

module.exports = usuarioCtrl;