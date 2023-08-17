const jwt = require('jsonwebtoken')

const generateToken = (id) => {
  return jwt.sign({id},process.env.SECRET_KEY,{expiresIn:"15m"})
}

module.exports = {generateToken};