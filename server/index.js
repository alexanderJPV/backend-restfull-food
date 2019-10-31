const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const db = require('./db');
const data = require('./src/_helpers/liquidBase/changeLog');
// const Usuario = db.usuario;
// const Sucursal = db.sucursal;
// reset database.

db.sequelize.sync({ force: true }).then(() => {
    console.log('Drop and resync with { force: true }');
    data.initialDataUsFer();
    data.initialDataSucursal();
});

// db.sequelize.sync({ force: true })
//     .then(() => {
//         data.initialDataUser();
//         data.initialDataSucursal();
//     });

// Usuario.findOne({ where: { id: '1' } })
//     .then( usuario => {
//         console.log('---------------------------------------------------------**********************');
//         // console.log(usuario);
//     }).catch((err) => {
//         console.log('errorrrrrrrrrrrrrrrrrrrr')});

// Sucursal.findOne({ where: { id: '1' } })
//         .then( sucursal => {
//             console.log('---------------------------------------------------------**********************');
//             console.log(sucursal);
//         }).then( sucursal => {
//             console.log('---------------------------------------------------------**********************');
//             console.log(sucursal);
//         }).catch((err) => {
//             console.log('errorrrrrrrrrrrrrrrrrrrr')});

app.set('port', process.env.PORT || 3000);

// midlewares
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200' })) // connect to port angular

// routes
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(require('./src/routes/sucursal.route'));
app.use(require('./src/routes/usuario.route'));
app.use(require('./src/routes/auth.route'));
// starting server
app.listen(app.get('port'), () => {
    console.log('Server on port 3000');
});