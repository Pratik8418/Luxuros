const mongoose = require('mongoose');

const hotelImageSchema = new mongoose.Schema({
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true,
  },
  image: {
    data: Buffer, 
    contentType: String, 
  },
});

module.exports = mongoose.model('HotelImage', hotelImageSchema);