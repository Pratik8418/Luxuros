const mongoose = require('mongoose'); // Erase if already required

var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "PropertyCat"
    }
});

//Export the model
module.exports = mongoose.model('Property', userSchema);