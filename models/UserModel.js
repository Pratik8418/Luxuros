const mongoose = require('mongoose'); // Erase if already required

var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;