const mongoose = require("mongoose");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const imageSchema = new mongoose.Schema({
  img: { data: Buffer, contentType: String }
});


const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
