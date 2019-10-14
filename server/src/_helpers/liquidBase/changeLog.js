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
        fechaNacimiento:'02/02/2019',
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
        fechaNacimiento:'02/02/2019',
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
        fechaNacimiento:'02/02/2019',
        telefono: '78855720'
    },
    {
        // id: 4,
        nombres: 'Propietario',
        apellidos: 'propietario',
        userName: 'prop123',
        email: 'system@localhost.com',
        password: '12345',
        estado: true,
        rol: ['ROL_PROPIETARIO'],
        genero: 'FEMENINO',
        estado: true,
        fechaNacimiento:'02/02/2019',
        telefono: '78855720'
    }
];

// Add user

exports.initialDataUser = function () {
    dataUser.forEach(usuario => {
        bcrypt.hash(usuario.password, 10, function (err, hash) {
            usuario.password = hash;
            Usuario.create(usuario);
        });
    });
}