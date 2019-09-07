const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const db = require('./db');

app.set('port', process.env.PORT || 3200);

// midlewares
app.use(morgan('dev'));
app.use(express.json());

// starting server
app.listen(app.get('port'), () => {
    console.log('Server on port 3200');
});
