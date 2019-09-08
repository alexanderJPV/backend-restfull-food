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
    Usuario.create(req.body).
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

module.exports = usuarioCtrl;