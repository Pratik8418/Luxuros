const asyncHandler = require('express-async-handler');
const Property = require('../models/PropertyModel')

const createProperty = asyncHandler(
  async (req, res) => {
    try {
       const property = await Property.create(req.body);
       res.json(property);
    } catch (error) {
        throw new Error(error.message);
    }
  }
)

module.exports = {createProperty}