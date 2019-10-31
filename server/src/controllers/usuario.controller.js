'use strict'

const db = require('../../db');
const bcrypt = require('bcrypt');
const control = require('../_helpers/pagination');
const roles = require('../_helpers/role');
const Usuario = db.usuario;
const Sequelize = require('sequelize');
const Op = Sequelize.Op

const usuarioCtrl = {};

usuarioCtrl.findAllRol = (req, res) => {
    const rol = req.query.rol ? req.query.rol : '';
    const keyword = req.query.keyword ? req.query.keyword.toUpperCase() : '';
    const page = req.query.page ? parseInt(req.query.page) : 0;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
    const offset = page * pageSize;
    const limit = offset + pageSize;
    const value = req.query.sort ? req.query.sort : 'id';
    const type = req.query.type ? req.query.type.toUpperCase() : 'ASC';
    // const data = Sequelize.where(Sequelize.fn('UPPER', Sequelize.col('nombres')), 'like', '%' + keyword + '%');
    let searchByRoleOrKeyword = Sequelize.literal(`"usuario"."id" is not null`);
    let queryOne = `AND UPPER("nombres") like '%${keyword}%'`;
    if (keyword && rol) {
        searchByRoleOrKeyword = Sequelize.literal(`"usuario"."rol" = ARRAY['${rol}']::VARCHAR(255)[] ${queryOne}`);
    }
    if (keyword && !rol) {
        const queryOne = `AND UPPER("nombres") like '%${keyword}%'`;
        searchByRoleOrKeyword = Sequelize.literal(`UPPER("nombres") like '%${keyword}%'`);
    }
    if (rol && !keyword) {
        const queryOne = `AND UPPER("nombres") like '%${keyword}%'`;
        searchByRoleOrKeyword = Sequelize.literal(`"usuario"."rol" = ARRAY['${rol}']::VARCHAR(255)[]`);
    }
    Usuario.findAndCountAll({ offset: parseInt(offset), limit: parseInt(pageSize), order: [[value, type]], where: { searchByRoleOrKeyword } })
        .then((usuario) => {
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
        }).catch((err) => {
            console.log(err);
            res.status(300).json({ msg: 'error', details: err });
        });
}

usuarioCtrl.findAll = (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 0;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
    const offset = page * pageSize;
    const limit = offset + pageSize;
    const value = req.query.sort ? req.query.sort : 'id';
    const type = req.query.type ? req.query.type.toUpperCase() : 'ASC';
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
        const urimage = ``;
        if (req.body.imagen != null) {
            urimage = `http://localhost:3000/${req.file.path}`;
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
                console.log('---------------------------------------------------');
                const dataError = Object.assign({}, err.errors['0']);
                // const message = data.message;
                // const val = Object.assign({}, err);
                // console.log(val.errors[0].message);
                res.status(500).json(
                    {
                        msg: 'error',
                        details: dataError
                    });
            });
    });
}

usuarioCtrl.update = async (req, res) => {
    const datas = await Object.assign({}, req.body);
    console.log('---------------------------------------------------');
    console.log('---------------------------------------------------');
    console.log();
    console.log('---------------------------------------------------');
    console.log('---------------------------------------------------');
    const newUser = await {
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
    await Usuario.update(newUser, { where: { id: newUser.id } }).
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

usuarioCtrl.activateAccount = async (req, res, next) => {
    const key = req.body.key;
    const findByKey = await Usuario.findOne({ where: { activate_key: key } });
    if (findByKey !== null) {
        const data = await findByKey.dataValues;
        data.estado = true;
        data.activate_key = null;
        await Usuario.update(data, { where: { id: findByKey.id } })
        res.status(200).json(findByKey);
    } else {
        res.status(500).json({ msg: 'error', details: 'La llave no es valida' });
    }
}

usuarioCtrl.roles = async (req, res) => {
    await res.status(200).json(roles);
}

module.exports = usuarioCtrl;