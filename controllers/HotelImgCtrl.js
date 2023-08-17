const asyncHandler = require('express-async-handler');
const HotelImage = require('../models/HotelImgModel')

const uploadImg = asyncHandler(
  async (req, res) => {
    try {
      const newImage = new HotelImage({
        hotelId: req.body.hotelId, // Assuming hotelId is sent in the request body
        image: {
          data: req.file.buffer,
          contentType: req.file.mimetype,
        },
      });
  
      await newImage.save();
      res.status(201).send('Image uploaded successfully');
    } catch (error) {
      throw new Error(error.message);
    }
  }
)

module.exports = {uploadImg}