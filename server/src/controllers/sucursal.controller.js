'use strict'
const db = require('../../db');
const bcrypt = require('bcrypt');
const control = require('../_helpers/pagination');
const tipos = require('../_helpers/tipo');
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
        const dia = JSON.parse(sucursal.dias);
        const diasarray=[];
        diasarray[0]= dia.lunes? 'lunes':'';
        diasarray[1]= dia.martes? 'martes':'';
        diasarray[2]= dia.miercoles? 'miercoles':'';
        diasarray[3]= dia.jueves? 'jueves':'';
        diasarray[4]= dia.viernes? 'viernes':'';
        const hora_apertura = JSON.parse(sucursal.hora_apertura);
        const hora_aperturasarray = [];
        hora_aperturasarray[0] = hora_apertura.hora_aperlunes? hora_apertura.hora_aperlunes:'';
        hora_aperturasarray[1] = hora_apertura.hora_apermartes? hora_apertura.hora_apermartes:'';
        hora_aperturasarray[2] = hora_apertura.hora_apermiercoles? hora_apertura.hora_apermiercoles:'';
        hora_aperturasarray[3] = hora_apertura.hora_aperjueves? hora_apertura.hora_aperjueves:'';
        hora_aperturasarray[4] = hora_apertura.hora_aperviernes? hora_apertura.hora_aperviernes:'';
        const hora_cierre = JSON.parse(sucursal.hora_cierre);
        const hora_cierrearray = [];
        hora_cierrearray[0] = hora_cierre.hora_cierrlunes? hora_cierre.hora_cierrlunes:'';
        hora_cierrearray[1] = hora_cierre.hora_cierrmartes? hora_cierre.hora_cierrmartes:'';
        hora_cierrearray[2] = hora_cierre.hora_cierrmiercoles? hora_cierre.hora_cierrmiercoles:'';
        hora_cierrearray[3] = hora_cierre.hora_cierrjueves? hora_cierre.hora_cierrjueves:'';
        hora_cierrearray[4] = hora_cierre.hora_cierrviernes? hora_cierre.hora_cierrviernes:'';

        console.log(sucursal);
        const datas = Object.assign({}, req.body);
        const newSucursal = {
            id: null,
            razon_social: datas.razon_social,
            telefono: datas.telefono,
            descripcion: datas.descripcion,
            tipo: [req.body.tipo],
            imagen: req.file ? `http://localhost:3000/${req.file.path}` : datas.imagen,
            type: datas.type,
            name: datas.name,
            nit: datas.nit,
            hora_cierre: hora_cierrearray,
            hora_apertura: hora_aperturasarray,
            dias: diasarray,
            direccion: datas.direccion,
            latitud: datas.latitud,
            longitud: datas.longitud
        };
        const data1 = await Sucursal.create(newSucursal);
        // const data2 = await Usuario_scursal.create({ usuarioId: req.currentUser.id, sucursalId: data1.dataValues.id });
        res.status(200).json(data1);
    } catch (error) {
        res.status(500).json({ msg: 'error', details: error });
    }
}

sucursalCtrl.update = (req, res) => {
    // console.log(req.body);
    const sucursal = Object.assign({}, req.body);
    const dia = JSON.parse(sucursal.dias);
    const diasarray=[];
    diasarray[0]= dia.lunes? 'lunes':'';
    diasarray[1]= dia.martes? 'martes':'';
    diasarray[2]= dia.miercoles? 'miercoles':'';
    diasarray[3]= dia.jueves? 'jueves':'';
    diasarray[4]= dia.viernes? 'viernes':'';
    const hora_apertura = JSON.parse(sucursal.hora_apertura);
    const hora_aperturasarray = [];
    hora_aperturasarray[0] = hora_apertura.hora_aperlunes? hora_apertura.hora_aperlunes:'';
    hora_aperturasarray[1] = hora_apertura.hora_apermartes? hora_apertura.hora_apermartes:'';
    hora_aperturasarray[2] = hora_apertura.hora_apermiercoles? hora_apertura.hora_apermiercoles:'';
    hora_aperturasarray[3] = hora_apertura.hora_aperjueves? hora_apertura.hora_aperjueves:'';
    hora_aperturasarray[4] = hora_apertura.hora_aperviernes? hora_apertura.hora_aperviernes:'';
    const hora_cierre = JSON.parse(sucursal.hora_cierre);
    const hora_cierrearray = [];
    hora_cierrearray[0] = hora_cierre.hora_cierrlunes? hora_cierre.hora_cierrlunes:'';
    hora_cierrearray[1] = hora_cierre.hora_cierrmartes? hora_cierre.hora_cierrmartes:'';
    hora_cierrearray[2] = hora_cierre.hora_cierrmiercoles? hora_cierre.hora_cierrmiercoles:'';
    hora_cierrearray[3] = hora_cierre.hora_cierrjueves? hora_cierre.hora_cierrjueves:'';
    hora_cierrearray[4] = hora_cierre.hora_cierrviernes? hora_cierre.hora_cierrviernes:'';
    const datas = Object.assign({}, req.body);
    const newSucursal = {
        id: datas.id,
        razon_social: datas.razon_social,
        telefono: datas.telefono,
        descripcion: datas.descripcion,
        tipo: [req.body.tipo],
        imagen: req.file ? `http://localhost:3000/${req.file.path}` : datas.imagen,
        type: datas.type,
        name: datas.name,
        nit: datas.nit,
        hora_cierre: hora_cierrearray,
        hora_apertura: hora_aperturasarray,
        dias: diasarray,
        direccion: datas.direccion,
        latitud: datas.latitud,
        longitud: datas.longitud
    };
    console.log(newSucursal);
    Sucursal.update(newSucursal, { where: { id: req.body.id } }).
        then((sucursal) => {
            res.status(200).json(sucursal);
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
sucursalCtrl.tipos = async(req, res) =>{
    await res.status(200).json(tipos);
}

sucursalCtrl.addedUser = async (req, res) => {
    try {
        const data2 = await Usuario_scursal.create({ usuarioId: req.body.usuarioId, sucursalId: req.body.sucursalId });
        res.status(200).json(data2);
    } catch (error) {
        res.status(500).json({ msg: 'error', details: error });
    }
}

sucursalCtrl.findUsesInSucursal = async (req, res) => {
    const data = await Sucursal.findOne({ where: { id: req.params.id},
        include: [{ model: Usuario, as: 'usuarios', require: false, attributes: ['id', 'nombres', 'apellidos', 'userName', 'email', 'imagen', 'genero', 'estado', 'telefono'], }]});
    res.status(200).json(data);
}

module.exports = sucursalCtrl;
