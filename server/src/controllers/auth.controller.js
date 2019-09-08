const role = require('../complements/enums/role');
const auth = require('../services/auth.service');
const bcrypt = require('bcrypt');
const cryptoRandomString = require('crypto-random-string');
const mail = require('../_helpers/mails/mail');

const db = require('../db');
const Usuario = db.usuario;

const usuarioCtrl = {};

usuarioCtrl.signup = (req, res) => {
    Usuario.findOne({ where: { email: req.body.email } }).
        then((usuario) => {
            res.status(400).json({ status: 400, msg: 'The account was created' });
        }).catch(() => {
            bcrypt.hash(req.body.password, 10, function (err, hash) {
                const refreshToken = cryptoRandomString({ length: 50, type: 'base64' });
                const new_User = {
                    nombres: req.body.nombres,
                    apellidos: req.body.apellidos,
                    userName: req.body.userName,
                    email: req.body.email,
                    password: hash,
                    rol: [role.ROLE_USER],
                    estado: req.body.estado,
                    activate_key: refreshToken,
                    status: false,
                }
                Usuario.create(new_User).
                    then((usuario) => {
                        const data = usuario.dataValues;
                        const url = 'http://localhost:4200/activate-account/';
                        mail.sendMail('/html/activateAccount.html', 'Activar Cuenta', url + data.refreshToken, data);
                        res.status(200).json({ status: 201, msg: 'created' });
                    }).catch((err) => {
                        res.status(500).json({ msg: 'error create user', details: err });
                    });
            });
        });
}

usuarioCtrl.signin = (req, res) => {
    Ususario.findOne({ where: { email: req.body.email } }).
        then((usuario) => {
            if (!usuario.dataValues.status) {
                res.status(500).send({ msg: 'Account no activate' });
            } else {
                bcrypt.compare(req.body.password, usuario.dataValues.password, async (err, result) => {
                    if (await err) {
                        res.status(400).send({ msg: err });
                    }
                    if (await !result) {
                        res.status(400).send({ msg: 'Password incorrect' });
                    } else {
                        // console.log('El resultado --> ', auth.createToken(user.dataValues));
                        auth.createToken(usuario.dataValues).then((token) => {
                            res.status(200).json({ msg: 'Authenticate successfully', token: token });
                        })
                    }
                });
            }
        }).catch((err) => {
            res.status(500).send({ msg: 'error', details: err + 'Email incorrect' });
        }
        );
}

module.exports = usuarioCtrl;