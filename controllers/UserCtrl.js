const User = require('../models/UserModel')
const asyncHandler = require('express-async-handler')
const {generateToken} = require('../middleware/jwtToken')
const bcrypt = require('bcrypt');

const createUser = asyncHandler(
  async (req,res) => {
    var {name,email,mobile,password} = req.body;
    try{
       
       const isFound = await User.findOne({email});
       if(isFound){
        return res.json({"message":"User already Register with same email"});
       }

       const isFound2 = await User.findOne({mobile});
       if(isFound2){
        return res.json({"message":"User already Register with same mobile"});
       }
       const salt = await bcrypt.genSalt(10);
       password = await bcrypt.hash(password,salt);

       const user = await User.create({
        name,
        email,
        mobile,
        password
       });

       res.status(200).json(user);
    }catch(error){
       throw new Error(error.message);
    }
  }
);

const login = asyncHandler(
 async (req,res) => {
  try{
    var {email,password} = req.body;
    const isFound = await User.findOne({email});
    if(!isFound){ return res.status(404).json({"message":"User with same email address is not register"})}
    const user = await User.findOne({email});

    const isMatched = await bcrypt.compare(password,user.password);
    if(!isMatched){
      return res.status(404).json({"message":"Password is wrong"});
    }
    const token = generateToken(user.id);
    res.status(200).json({"User":user,"Token":token});
  }catch(error){
    throw new Error(error.message);
  }
 }
)

const testToken = asyncHandler(
  async (req,res) => {
    try{
       const user = await User.findById(req.user.id);
       res.json(user);
    }catch(error){
      throw new Error(error.message);
    }
  }
)
module.exports = {createUser,login,testToken};
