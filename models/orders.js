const mongoose = require("mongoose");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const ordersSchema = new mongoose.Schema({
  order: [{ id: String, date: Date, nameOfGoods: String, amountOfGoods: Number, priceOfGoods: Number, imagePath: String }],
  country: { type: String, required: true },
  firstName: { type: String, required: true },
  secondName: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: String,
  zip: { type: String, required: true },
  phone: {
    type: String,
    required: true
  },
  date: Date,
});

ordersSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const Orders = mongoose.model("Orders", ordersSchema);

module.exports = Orders;