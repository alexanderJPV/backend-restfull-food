'use strict'
const db = require('../../db');
const bcrypt = require('bcrypt');
const control = require('../_helpers/pagination');
const Sucursal = db.sucursal;
const Usuario = db.usuario;
const Usuario_scursal = db.usuario_scursal;
const Sequelize = require('sequelize');
const Op = Sequelize.Op

const sucursalCtrl = {};


sucursalCtrl.findAllTipo = (req, res) => {
    const tipo = req.query.tipo ? req.query.tipo : '';
    const keyword = req.query.keyword ? req.query.keyword.toUpperCase() : '';
    const page = req.query.page ? parseInt(req.query.page) : 0;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
    const offset = page * pageSize;
    const limit = offset + pageSize;
    const value = req.query.sort ? req.query.sort : 'id';
    const type = req.query.type ? req.query.type.toUpperCase() : 'ASC';
    // const data = Sequelize.where(Sequelize.fn('UPPER', Sequelize.col('nombres')), 'like', '%' + keyword + '%');
    let searchByRoleOrKeyword = Sequelize.literal(`"sucursal"."id" is not null`);
    let queryOne = `AND UPPER("razon_social") like '%${keyword}%'`;
    if (keyword && tipo) {
        searchByRoleOrKeyword = Sequelize.literal(`"sucursal"."tipo" = ARRAY['${tipo}']::VARCHAR(255)[] ${queryOne}`);
    }
    if (keyword && !tipo) {
        searchByRoleOrKeyword = Sequelize.literal(`UPPER("razon_social") like '%${keyword}%'`);
    }
    if (tipo && !keyword) {
        searchByRoleOrKeyword = Sequelize.literal(`"sucursal"."tipo" = ARRAY['${tipo}']::VARCHAR(255)[]`);
    }
    Sucursal.findAndCountAll({ offset: parseInt(offset), limit: parseInt(pageSize), order: [[value, type]], where: { searchByRoleOrKeyword } })
        .then((sucursal) => {
            const pages = Math.ceil(sucursal.count / limit);
            const elements = sucursal.count;
            res.status(200).json(
                {
                    elements,
                    page,
                    pageSize,
                    pages,
                    sucursal,
                }
            );
        }).catch((err) => {
            console.log(err);
            res.status(300).json({ msg: 'error', details: err });
        });
}

sucursalCtrl.findAll = (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 0;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
    const offset = page * pageSize;
    const limit = offset + pageSize;
    const value = req.query.sort ? req.query.sort : 'id';
    const type = req.query.type ? req.query.type.toUpperCase() : 'ASC';
    Sucursal.findAndCountAll({ offset: parseInt(offset), limit: parseInt(pageSize), order: [[value, type]] }).
        then((sucursal) => {
            const pages = Math.ceil(sucursal.count / limit);
            const elements = sucursal.count;
            res.status(200).json(
                {
                    elements,
                    page,
                    pageSize,
                    pages,
                    sucursal,
                }
            );
        }).catch(err => {
            console.log(err);
            res.status(500).json({ msg: "error", details: err });
        });
}

sucursalCtrl.findAllByUser = (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 0;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
    const offset = page * pageSize;
    const limit = offset + pageSize;
    const value = req.query.sort ? req.query.sort : 'id';
    const type = req.query.type ? req.query.type.toUpperCase() : 'ASC';

    Sucursal.findAndCountAll({ offset: parseInt(offset), limit: parseInt(pageSize), order: [[value, type]] }).
        then((sucursal) => {
            const pages = Math.ceil(sucursal.count / limit);
            const elements = sucursal.count;
            res.status(200).json(
                {
                    elements,
                    page,
                    pageSize,
                    pages,
                    sucursal,
                }
            );
        }).catch(err => {
            console.log(err);
            res.status(500).json({ msg: "error", details: err });
        });
}

sucursalCtrl.create = async (req, res) => {
    const sucursal = Object.assign({}, req.body);
    try {
        console.log('----------------------------------------------------');
        console.log(sucursal);
        const datas = Object.assign({}, req.body);
        const newSucursal = {
            id: null,
            razon_social: datas.razon_social,
            telefono: datas.apellidos,
            descripcion: datas.descripcion,
            tipo: [req.body.tipo],
            imagen: req.file ? `http://localhost:3000/${req.file.path}` : datas.imagen,
            type: datas.type,
            name: datas.name,
            nit: datas.nit,
            // direccion: datas.direccion
        };
        const data1 = await Sucursal.create(newSucursal);
        // const data2 = await Usuario_scursal.create({ usuarioId: req.currentUser.id, sucursalId: data1.dataValues.id });
        res.status(200).json(data1);
    } catch (error) {
        res.status(500).json({ msg: 'error', details: error });
    }
}

sucursalCtrl.update = (req, res) => {
    Sucursal.update(req.body, { where: { id: req.body.id } }).
        then((sucursal) => {
            res.status(300).json(sucursal);
        }).catch((err) => {
            res.status(500).json({ msg: 'error', details: err });
        });
}

sucursalCtrl.findById = (req, res) => {
    const id = req.params.id;
    Sucursal.findOne({ where: { id: id } }).
        then((sucursal) => {
            res.status(200).json(sucursal);
        }).catch((err) => {
            res.status(300).json({ msg: 'error', details: err });
        });
}

sucursalCtrl.delete = (req, res) => {
    const id = req.params.id;
    Sucursal.destroy({ where: { id: id } }).
        then(() => {
            res.status(200).json({ msg: 'deleted successfully -> curstomer id = ', id });
        }).catch((err) => {
            res.status(300).json({ msg: 'error', details: err });
        });
}

module.exports = sucursalCtrl;
