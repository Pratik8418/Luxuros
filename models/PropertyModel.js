const mongoose = require('mongoose'); // Erase if already required

var propertySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "PropertyCat"
    },
    description:{
        type: String,
        required: true
    },
    address:{
        type:String,
        required:true
    }
});

//Export the model
module.exports = mongoose.model('Property', propertySchema);