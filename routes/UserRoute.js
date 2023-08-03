const {createUser, login, testToken } = require('../controllers/UserCtrl')
const {authMiddleware} = require('../middleware/authMiddleware')
const route = require('express').Router();

route.post('/createUser',createUser);
route.post('/getUser',login);
route.get('/test',authMiddleware,testToken);

module.exports = route
