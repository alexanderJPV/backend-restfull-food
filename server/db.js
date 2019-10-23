const pg = require('pg');

const client = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'restfullfood',
    password: '123',
    port: 5432,
});

client.connect()
    .then(db => console.log('DB pg is connect'))
    .catch(err => console.error(err));

const env = {
    database: 'restfullfood',
    username: 'postgres',
    password: '123',
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

// create db
db.usuario = require('../server/src/models/usuario.model')(sequelize, Sequelize);
db.califica = require('../server/src/models/califica.model')(sequelize, Sequelize);
db.visita = require('../server/src/models/visita.model')(sequelize, Sequelize);
db.sucursal = require('../server/src/models/sucursal.model')(sequelize, Sequelize);
db.Sequelize = Sequelize;
db.sequelize = sequelize;
// relationship (usuario <-> usuario_sucursal)
db.usuario.hasMany(db.sucursal, { constraints: false });
db.sucursal.belongsToMany(db.usuario, {
    through: 'usuario_sucursal',
    constraints: false
});
// relatinship

module.exports = db;