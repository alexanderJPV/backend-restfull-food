'use strict'
const db = require('../../db');
const bcrypt = require('bcrypt');
const control = require('../_helpers/pagination');
const Sucursal = db.sucursal;
const Sequelize = require('sequelize');
const Op = Sequelize.Op

const sucursalCtrl = {};
