const Country = require('../models/country');
const getCountryIdRouter = require('express').Router();

getCountryIdRouter.get('/', async (req, res) => {
  try {
    const countries = await Country.find({});
    res.json({ countries });
  } catch (e) {
    console.error(e);
  }
});

module.exports = getCountryIdRouter;
