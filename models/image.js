const mongoose = require("mongoose");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const imageSchema = new mongoose.Schema({
  name: String,
  desc: String,
  img:
  {
    data: Buffer,
    contentType: String
  }
});

const Image2 = mongoose.model('Image2', imageSchema);

module.exports = Image2;
