const { createPropertyCat, getPropertyCat } = require('../controllers/PropertyCatCtrl');
const route = require('express').Router();

route.post('/createPropertyCat',createPropertyCat);
route.get('/getPropertyCat',getPropertyCat);

module.exports = route;