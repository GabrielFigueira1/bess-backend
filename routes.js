const express = require('express');
const res = require('express/lib/response');

const routes = express.Router();

const dataController = require('./controllers/dataController');

routes.get('/test', (req, res) => {
    res.send("Server is running.");
});

routes.get('/allData', dataController.readAll)

routes.get('/readLast', dataController.readLast);

routes.post('/insertData', dataController.insertData);

module.exports = routes;
