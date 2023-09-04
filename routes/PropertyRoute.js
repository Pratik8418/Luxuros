const { uploadImg, getImages } = require('../controllers/HotelImgCtrl');
const { createProperty, getAllProperty,getProperty } = require('../controllers/PropertyCtrl');
const route = require('express').Router();
const multer = require('multer');

route.post('/createProperty',createProperty);
route.post('/getProperty',getProperty);
route.get('/getAllProperty',getAllProperty);

//Property Images Route
const storage = multer.memoryStorage(); // Store files in memory as buffers
const upload = multer({ storage: storage });
route.post('/uploadImg',upload.single('image'),uploadImg)
route.get('/getImages',getImages);

module.exports = route;