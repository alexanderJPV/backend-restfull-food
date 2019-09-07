const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const db = require('./db');

// reset database.
db.sequelize.sync({ force: true }).then(() => {
    console.log('Drop and resync with { force: true }');
});

app.set('port', process.env.PORT || 3200);

// midlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200' })) // connect to port angular

// starting server
app.listen(app.get('port'), () => {
    console.log('Server on port 3200');
});
