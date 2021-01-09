const Orders = require("../models/orders")
const Goods = require("../models/goods")
const { check, validationResult } = require('express-validator')
const ordersRouter = require("express").Router();

ordersRouter.get("/", async (request, response) => {
  const goods = await Orders.find({});
  response.json(goods.map((u) => u.toJSON()));
});

async function decriaseAmountOfGoods(arr) {
  for (let i = 0; i < arr.length; i++) {
    const el = arr[i]
    const [id, amountOfGoods] = el
    const goods = await Goods.findById(id)
    await Goods.findByIdAndUpdate(id, { amountOfGoods: goods.amountOfGoods - amountOfGoods })
  }
}

ordersRouter.post("/",
  [
    check('order', 'You should fill all field').exists(),
    check('country', 'You should fill all field').exists(),
    check('firstName', 'You should fill all field').exists(),
    check('secondName', 'You should fill all field').exists(),
    check('address', 'You should fill all field').exists(),
    check('city', 'You should fill all field').exists(),
    check('zip', 'You should fill all field').exists(),
    check('phone')
      .trim()
      .isNumeric().withMessage('Phone number must be numeric')
      .bail()
      .isLength({ min: 10, max: 13 }).withMessage('Phone number must be 10 digits long')
      .bail()],

  async (request, response) => {

    const errors = validationResult(request)

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array(), message: 'Wrong registration data' })
    }

    try {
      const { order, country, firstName, secondName, address, city, state, zip, phone } = request.body
      const goodsFromOrders = order.map(el => [el.id, el.amountOfGoods])

      const newOrder = new Orders({
        order,
        country,
        firstName,
        secondName,
        address,
        city,
        state,
        zip,
        phone,
        date: new Date(),
      });

      await newOrder.save();
      decriaseAmountOfGoods(goodsFromOrders)
      response.status(201).json({ message: 'New order created', order: newOrder.toJSON() })
    } catch (e) {
      response.status(500).json({ message: 'Something goes wrong, try again' })
    }
  })

module.exports = ordersRouter;
