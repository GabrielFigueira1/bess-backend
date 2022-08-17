//basic setup for express
const express = require('express');
 
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const routes = require('./routes');

const app = express();
 
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
 
app.use(helmet());
 
app.use(express.json());
 
app.use(morgan('dev'));

app.use(routes)
 
app.post('/login', (req, res, next) => {
    res.json({ token: '123456' });
});

/*app.get('/', (req, res) => {
    res.write('Running!')
    res.end()
})*/
 
module.exports = app;