const User = require('../models/UserModel')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const authMiddleware = asyncHandler(
  async (req,res,next) => {
    if(req?.headers?.authorization?.startsWith("Bearer")){
      const token = req.headers.authorization.split(' ')[1];
      try{
        if(token){
          const secret = process.env.SECRET_KEY;
          const decoded = jwt.verify(token,secret);
          const user = await User.findById(decoded?.id);
          req.user = user;
          next();
        }
      }catch(error){
        throw new Error("Authorized token expired, please login again");
      }
    }else{
      throw new Error("Token is not atteched with header");
    }
  }
)

module.exports = {authMiddleware}