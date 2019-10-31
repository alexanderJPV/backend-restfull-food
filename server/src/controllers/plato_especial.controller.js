'use strict'
const db = require('../../db');
const control = require('../_helpers/pagination');
const plato_especial = db.plato_especial;
const Sucursal = db.sucursal;
const Usuario = db.usuario;
const Usuario_scursal = db.usuario_scursal;
const Sequelize = require('sequelize');
const Op = Sequelize.Op

const platoEspCtrl = {};

platoEspCtrl.findAll = (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 0;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
    const offset = page * pageSize;
    const limit = offset + pageSize;
    const value = req.query.sort ? req.query.sort : 'id';
    const type = req.query.type ? req.query.type.toUpperCase() : 'ASC';
    plato_especial.findAndCountAll({ offset: parseInt(offset), limit: parseInt(pageSize), order: [[value, type]] }).
        then((plato) => {
            const pages = Math.ceil(plato.count / limit);
            const elements = plato.count;
            res.status(200).json(
                {
                    elements,
                    page,
                    pageSize,
                    pages,
                    plato
                }
            );
        }).catch(err => {
            console.log(err);
            res.status(500).json({ msg: "error", details: err });
        });
}
module.exports = platoEspCtrl;
