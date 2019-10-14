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
        telefono: '788855720'
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
        telefono: '788855720'
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
        telefono: '788855720'
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