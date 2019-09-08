const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const db = require('./db');
const data = require('./src/_helpers/liquidBase/changeLog');

// reset database.
db.sequelize.sync({ force: true }).then(() => {
    console.log('Drop and resync with { force: true }');
    data.initialDataUser();
});

app.set('port', process.env.PORT || 3000);

// midlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200' })) // connect to port angular

// routes
app.use(require('./src/routes/usuario.route'));

// starting server
app.listen(app.get('port'), () => {
    console.log('Server on port 3000');
});
