const role = require('../_helpers/role');
const auth = require('../services/auth.service');
const bcrypt = require('bcrypt');
const cryptoRandomString = require('crypto-random-string');
const mail = require('../_helpers/mails/mail');

const db = require('../../db');
const Usuario = db.usuario;

const usuarioCtrl = {};

usuarioCtrl.signup = async (req, res) => {
    const data = await Usuario.findOne({ where: { email: req.body.email } });
    try {
        if (data !== null) {
            res.status(400).json('El usuario ya esta registrado');
        } else {
            bcrypt.hash(req.body.password, 10, function (err, hash) {
                const refreshToken = cryptoRandomString({ length: 50, type: 'base64' });
                const new_User = {
                    nombres: req.body.nombres,
                    apellidos: req.body.apellidos,
                    userName: req.body.userName,
                    email: req.body.email,
                    password: hash,
                    rol: ['ROL_CLIENTE'],
                    estado: false,
                    genero: 'MASCULINO',
                    activate_key: refreshToken,
                }
                Usuario.create(new_User).
                    then((usuario) => {
                        const data = usuario.dataValues;
                        const url = 'http://localhost:4200/activate-account/';
                        mail.sendMail('/templates/activateAccount.html', 'Activar Cuenta', url + data.refreshToken, data);
                        res.status(200).json({ status: 201, msg: 'created' });
                    }).catch((err) => {
                        res.status(500).json({ msg: 'error create user', details: err });
                    });
            });
        }
    } catch (error) {
        res.status(500).json({ msg: 'error create user', details: err });
    }
}

usuarioCtrl.signin = (req, res) => {
    Usuario.findOne({ where: { email: req.body.email } }).then((usuario) => {
        if (!usuario.dataValues.estado) {
            res.status(500).send({ msg: 'Account no activate' });
        } else {
            bcrypt.compare(req.body.password, usuario.dataValues.password, async (err, result) => {
                if (await !result) {
                    res.status(400).send({ msg: 'Password incorrect' });
                } else {
                    const token = auth.createToken(usuario.dataValues);
                    console.log('EL token creado --> ', token);
                    res.status(200).json({ token: token });
                }
            });
        }
    }).catch((err) => {
        res.status(500).send({ msg: 'error', details: err + 'Email incorrect' });
    });
}

usuarioCtrl.account = async (req, res) => {
    try {
        const data = await auth.showInsideToken(req.token);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ msg: 'Error token expired', details: err })
    }
}

usuarioCtrl.logout = async (req, res) => {
    const data = await auth.destroyToken(req.token);
    res.json(data);
}

module.exports = usuarioCtrl;