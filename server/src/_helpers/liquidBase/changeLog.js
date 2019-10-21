'user strict'

const bcrypt = require('bcrypt');
const db = require('../../../db');
const Usuario = db.usuario;

const dataUser = [
    {
        // id: 1,
        nombres: 'User',
        apellidos: 'User user',
        userName: 'user1234',
        email: 'user@localhost.com',
        password: '12345',
        estado: true,
        rol: ['ROL_CLIENTE'],
        genero: 'MASCULINO',
        estado: true,
        fechaNacimiento: new Date(1980, 6, 20),
        telefono: '78855720'
    },
    {
        // id: 2,
        nombres: 'Admin',
        apellidos: 'Admin Admin',
        userName: 'admin1234',
        email: 'admin@localhost.com',
        password: '12345',
        estado: true,
        rol: ['ROL_ADMIN'],
        genero: 'MASCULINO',
        estado: true,
        fechaNacimiento: new Date(1980, 6, 20),
        telefono: '78855720'
    },
    {
        // id: 3,
        nombres: 'System',
        apellidos: 'System System',
        userName: 'system1234',
        email: 'system@localhost.com',
        password: '12345',
        estado: true,
        rol: ['ROL_PROPIETARIO'],
        genero: 'MASCULINO',
        estado: true,
        fechaNacimiento: new Date(1980, 6, 20),
        telefono: '78855720'
    },
    {
        // id: 4,
        nombres: 'Propietario',
        apellidos: 'propietario',
        userName: 'prop123',
        email: 'prop@localhost.com',
        password: '12345',
        estado: true,
        rol: ['ROL_PROPIETARIO'],
        genero: 'FEMENINO',
        estado: true,
        fechaNacimiento: new Date(1980, 6, 20),
        telefono: '78855720'
    },
    {
        // id: 5,
        nombres: 'Propietario',
        apellidos: 'propietario',
        userName: 'prop1234',
        email: 'pro1p@localhost.com',
        password: '12345',
        estado: true,
        rol: ['ROL_PROPIETARIO'],
        genero: 'MASCULINO',
        estado: true,
        fechaNacimiento: new Date(1980, 6, 20),
        telefono: '78855720'
    },
    {
        // id: 6,
        nombres: 'Propietario',
        apellidos: 'propietario',
        userName: 'prop12341',
        email: 'prop2@localhost.com',
        password: '12345',
        estado: true,
        rol: ['ROL_PROPIETARIO'],
        genero: 'FEMENINO',
        estado: true,
        fechaNacimiento: new Date(1980, 6, 20),
        telefono: '78855720'
    },
    {
        // id: 7,
        nombres: 'Propietario',
        apellidos: 'propietario',
        userName: 'prop12345',
        email: 'prop3@localhost.com',
        password: '12345',
        estado: true,
        rol: ['ROL_PROPIETARIO'],
        genero: 'FEMENINO',
        estado: true,
        fechaNacimiento: new Date(1980, 6, 20),
        telefono: '78855720'
    },
    {
        // id: 8,
        nombres: 'Propietario',
        apellidos: 'propietario',
        userName: 'prop123456',
        email: 'prop4@localhost.com',
        password: '12345',
        estado: true,
        rol: ['ROL_PROPIETARIO'],
        genero: 'FEMENINO',
        estado: true,
        fechaNacimiento: new Date(1980, 6, 20),
        telefono: '78855720'
    },
    {
        // id: 9,
        nombres: 'Propietario',
        apellidos: 'propietario',
        userName: 'prop1234567',
        email: 'prop5@localhost.com',
        password: '12345',
        estado: true,
        rol: ['ROL_PROPIETARIO'],
        genero: 'FEMENINO',
        estado: true,
        fechaNacimiento: new Date(1980, 6, 20),
        telefono: '78855720'
    },
    {
        // id: 10,
        nombres: 'Propietario',
        apellidos: 'propietario',
        userName: 'prop12345678',
        email: 'prop6@localhost.com',
        password: '12345',
        estado: true,
        rol: ['ROL_PROPIETARIO'],
        genero: 'FEMENINO',
        estado: true,
        fechaNacimiento: new Date(1980, 6, 20),
        telefono: '78855720'
    },
    {
        // id: 11,
        nombres: 'Propietario',
        apellidos: 'propietario',
        userName: 'prop123456789',
        email: 'prop7@localhost.com',
        password: '12345',
        estado: true,
        rol: ['ROL_PROPIETARIO'],
        genero: 'FEMENINO',
        estado: true,
        fechaNacimiento: new Date(1980, 6, 20),
        telefono: '78855720'
    }
];

// Add user

exports.initialDataUser = function () {
    dataUser.forEach(usuario => {
        // bcrypt.hash(usuario.password, 10, function (err, hash) {
        usuario.password = bcrypt.hashSync(usuario.password, 10);
        Usuario.create(usuario);
        // });
    });
}