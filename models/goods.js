const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const goodsSchema = new mongoose.Schema({
  nameOfGoods: {
    type: String,
    unique: true,
    required: true,
    minlength: 3,
  },
  amountOfGoods: Number,
  priceOfGoods: Number,
  imagePath: String
});

goodsSchema.plugin(uniqueValidator);

goodsSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const Goods = mongoose.model("Goods", goodsSchema);

module.exports = Goods;