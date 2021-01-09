const Goods = require("../models/goods")
const goodsRouter = require("express").Router();
const { check, validationResult } = require('express-validator')

goodsRouter.get("/", async (request, response) => {
  const goods = await Goods.find({});
  response.json(goods.map((u) => u.toJSON()));
});

goodsRouter.get("/:id", (request, response, next) => {
  Goods.findById(request.params.id)
    .then((el) => {
      response.json(el.toJSON());
    })
    .catch((error) => next(error));
});

goodsRouter.post("/",
  [
    check('nameOfGoods', 'You should fill all fields').exists(),
    check('amountOfGoods', 'Must be numeric').isNumeric(),
    check('priceOfGoods', 'Must be numeric').isNumeric(),
    check('imagePath', 'You should fill all fields').exists(),
  ],

  async (request, response) => {
    try {
      const errors = validationResult(request)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: 'You enered wrong data' })
      }

      const { nameOfGoods, amountOfGoods, priceOfGoods, imagePath } = request.body

      const newItem = new Goods({
        nameOfGoods,
        amountOfGoods,
        priceOfGoods,
        imagePath: `${body.imagePath}.jpg`
      })

      await newItem.save();
      response.status(201).json({ message: 'New item saved', 'new item': newItem.toJSON() })
    } catch (e) {
      response.status(500).json({ message: 'Something goes wrong, try again' })
    }
  }
);

module.exports = goodsRouter;



