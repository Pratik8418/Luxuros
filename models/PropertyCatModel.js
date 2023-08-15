const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var propertyCatSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('PropertyCat', propertyCatSchema);