const pg = require('pg');
const fs = require('fs');

const dotenv = require('dotenv');
if (process.env.NODE_ENV === 'production') {
    const envConfig = dotenv.parse(fs.readFileSync('.env.production'));
    for (const k in envConfig) {
        process.env[k] = envConfig[k]
    }
}
if (process.env.NODE_ENV === 'development') {
    const envConfig = dotenv.parse(fs.readFileSync('.env.development'));
    for (const k in envConfig) {
        process.env[k] = envConfig[k]
    }
}

const client = new pg.Client({
    user: process.env.POSTGRES_USER,
    host: process.env.HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
});

client.connect()
    .then(db => console.log('DB pg is connect'))
    .catch(err => console.error(err));

const env = {
    database: process.env.POSTGRES_DB,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.HOST,
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
    port: process.env.POSTGRES_PORT,
    dialectOptions: {
        connectTimeout: 60000
    },
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
db.plato_especial = require('../server/src/models/plato_especial')(sequelize, Sequelize);

// --------------------------- relationship (usuario <-> usuario_sucursal)
db.usuario.belongsToMany(db.sucursal, { through: db.usuario_scursal, onDelete: 'CASCADE' });
db.sucursal.belongsToMany(db.usuario, { through: db.usuario_scursal, onDelete: 'CASCADE' });

module.exports = db;