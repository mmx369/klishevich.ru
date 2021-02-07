const mongoose = require("mongoose");
const { Types } = require('mongoose')
const uniqueValidator = require("mongoose-unique-validator");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const countrySchema = new mongoose.Schema({
  country: String,
});

countrySchema.plugin(uniqueValidator);

const Country = mongoose.model("Country", countrySchema);

module.exports = Country;



