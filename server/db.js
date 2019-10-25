const pg = require('pg');

const client = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'restfullfood',
    password: 'postgres',
    port: 5432,
});

client.connect()
    .then(db => console.log('DB pg is connect'))
    .catch(err => console.error(err));

const env = {
    database: 'restfullfood',
    username: 'postgres',
    password: 'postgres',
    host: 'localhost',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

const Sequelize = require('sequelize');

const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    operatorsAliases: false,
    pool: {
        max: env.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// create db
db.usuario = require('../server/src/models/usuario.model')(sequelize, Sequelize);
db.sucursal = require('../server/src/models/sucursal.model')(sequelize, Sequelize);
db.usuario_scursal = require('../server/src/models/usuario_sucursal.model')(sequelize, Sequelize);
// db.califica = require('../server/src/models/califica.model')(sequelize, Sequelize);
// db.visita = require('../server/src/models/visita.model')(sequelize, Sequelize);
// --------------------------- relationship (usuario <-> usuario_sucursal)
db.usuario.belongsToMany(db.sucursal, { through: db.usuario_scursal, onDelete: 'CASCADE' });
db.sucursal.belongsToMany(db.usuario, { through: db.usuario_scursal, onDelete: 'CASCADE' });
// db.sucursal.belongsToMany(db.usuario, {
//     constraints: false,
//     through: 'usuario_sucursal'
// ,
// onDelete: 'CASCADE'
// });
// relatinship

module.exports = db;