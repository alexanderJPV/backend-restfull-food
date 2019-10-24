'use strict'
const db = require('../../db');
const bcrypt = require('bcrypt');
const control = require('../_helpers/pagination');
const Usuario = db.usuario;
const Sequelize = require('sequelize');
const Op = Sequelize.Op

const sucursalCtrl = {};
