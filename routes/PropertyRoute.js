const { createProperty } = require('../controllers/PropertyCtrl');
const route = require('express').Router();

route.post('/createProperty',createProperty);

module.exports = route;