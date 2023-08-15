const { createPropertyCat } = require('../controllers/PropertyCatCtrl');
const route = require('express').Router();

route.post('/createPropertyCat',createPropertyCat);

module.exports = route;