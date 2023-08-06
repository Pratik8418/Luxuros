const User = require('../models/UserModel')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const authMiddleware = asyncHandler(
  async (req,res,next) => {
    if(req?.headers?.cookie){
      const cookie = req.headers.cookie;
      const token = cookie.split('=')[1];
      try{
        if(token){
          const secret = process.env.SECRET_KEY;
          const decoded = jwt.verify(token,secret);
          const user = await User.findById(decoded?.id);
          req.user = user;
          next();
        }
      }catch(error){
        res.status(403).json({"message":"Authorized token expired, please login again"})
      }
    }else{
      res.status(401).json({"message":"Token is not atteched with header"})
    }
  }
)

module.exports = {authMiddleware}