const mongoose = require("mongoose");
const { Types } = require('mongoose')
const uniqueValidator = require("mongoose-unique-validator");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const categorySchema = new mongoose.Schema({
  category: String,
});

categorySchema.plugin(uniqueValidator);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;