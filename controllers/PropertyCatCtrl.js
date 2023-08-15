const asyncHandler = require('express-async-handler');
const PropertyCat = require('../models/PropertyCatModel')

const createPropertyCat = asyncHandler(
  async (req, res) => {
    try {
       const propertyCat = await PropertyCat.create(req.body);
       res.json(propertyCat);
    } catch (error) {
        throw new Error(error.message);
    }
  }
)

module.exports = {createPropertyCat}