const Goods = require("../models/goods")
const multer = require('multer')
const fs = require('fs')
const goodsRouter = require("express").Router();
const { check, validationResult } = require('express-validator')


//upload file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'build/static/img_shop')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    console.log('wrong file extension')
    cb(null, false)
  }
}

const upload = multer({ storage: storage, fileFilter })

goodsRouter.post('/img', upload.single('image'), async (req, res) => {
  console.log('POST-GOODS!!!', req.file);
  try {
    const { filename, path: filepath, mimetype } = req.file
    console.log('filename:', filename, 'filepath:', filepath, 'mimetype:', mimetype)

    return res.status(201).json({
      message: 'File uploaded successfully'
    })
  } catch (e) {
    console.error(e)
  }
})
// end upload


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

      console.log(123456, request.body);

      const newItem = new Goods({
        nameOfGoods,
        amountOfGoods,
        priceOfGoods,
        imagePath: `${imagePath}`
      })
      console.log('newItem', newItem);

      await newItem.save();
      response.status(201).json({ message: 'New item saved', 'new item': newItem.toJSON() })
    } catch (e) {
      response.status(500).json({ message: 'Something goes wrong, try again' })
    }
  }
);

module.exports = goodsRouter;



