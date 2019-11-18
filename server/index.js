const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const data = require('./src/_helpers/liquidBase/changeLog');
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

// ------------reset database.
// const db = require('./db');
// db.sequelize.sync({ force: true }).then(() => {
//     console.log('Drop and resync with { force: true }');
//     data.initialDataUser();
//     data.initialDataSucursal();
//     data.initialDataPlatosEsp();
// });

app.set('port', process.env.PORT || 3000);

// midlewares
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(cors({ origin: process.env.PORT_FRONTEND })) // connect to port angular

// routes
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(require('./src/routes/plato_especial.route'));
app.use(require('./src/routes/sucursal.route'));
app.use(require('./src/routes/usuario.route'));
app.use(require('./src/routes/auth.route'));
// starting server
app.listen(app.get('port'), () => {
    console.log('Server on port 3000');
});