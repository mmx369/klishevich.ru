const Goods = require('../models/goods');
const Country = require('../models/country');
const Category = require('../models/categoriesShop');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs');
const goodsRouter = require('express').Router();
const { check, validationResult } = require('express-validator');
const { count } = require('../models/goods');

//upload file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'build/static/img_shop');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    console.log('wrong file extension');
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter });

goodsRouter.post('/img', upload.single('image'), async (req, res) => {
  console.log('POST-GOODS!!!', req.file);

  try {
    const { filename, path: filepath, mimetype } = req.file;
    console.log(
      'filename:',
      filename,
      'filepath:',
      filepath,
      'mimetype:',
      mimetype
    );

    return res.status(201).json({
      message: 'File uploaded successfully',
    });
  } catch (e) {
    console.error(e);
  }
});
// end upload

goodsRouter.get('/', async (request, response) => {
  const goods = await Goods.find({});

  console.log('Goods: ', goods);

  //make category list PaperMoney - begin
  const goodsPaperMoney = goods.filter(
    (el) =>
      el.amountOfGoods > 0 && String(el.category) === '601c638753bec224ffda838f'
  );
  const countryIds = goodsPaperMoney.map((el) => String(el.country));
  const uniqueSet = new Set(countryIds);
  const backToArr = [...uniqueSet];
  const countryList = await Country.find(
    {
      _id: {
        $in: backToArr,
      },
    },
    function (err, docs) {
      console.log(docs);
    }
  );
  console.log('CountryList: ', countryList);
  const paperMoneyCategory = countryList.map((el) => el.country).sort();
  console.log('PaperCategory', paperMoneyCategory);

  //make category list PaperMoney - end

  //make category list Coin - begin
  const goodsCoins = goods.filter(
    (el) =>
      el.amountOfGoods > 0 && String(el.category) === '601f072c36b3304ab510d160'
  );
  let coinCategory;
  if (goodsCoins) {
    const countryIds = goodsCoins.map((el) => String(el.country));
    const uniqueSet = new Set(countryIds);
    const backToArr = [...uniqueSet];
    const countryList = await Country.find(
      {
        _id: {
          $in: backToArr,
        },
      },
      function (err, docs) {
        console.log(docs);
      }
    );
    coinCategory = countryList.map((el) => el.country);
  }
  response.json({
    goodsList: goods.map((u) => u.toJSON()),
    categoryList: paperMoneyCategory,
    coinList: coinCategory,
  });
});

goodsRouter.get('/:id', (request, response, next) => {
  Goods.findById(request.params.id)
    .then((el) => {
      response.json(el.toJSON());
    })
    .catch((error) => next(error));
});

goodsRouter.post(
  '/',
  [
    check('nameOfGoods', 'You should fill all fields').exists(),
    check('amountOfGoods', 'Must be numeric').isNumeric(),
    check('priceOfGoods', 'Must be numeric').isNumeric(),
    check('imagePath', 'You should fill all fields').exists(),
    check('category', 'You should fill all fields').exists(),
  ],

  async (request, response) => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ errors: errors.array(), message: 'You entered wrong data' });
      }

      console.log('POST!!!', request.body);
      const {
        nameOfGoods,
        amountOfGoods,
        priceOfGoods,
        imagePath,
        category,
        country,
      } = request.body;

      const decodedToken = jwt.verify(response.token, process.env.SECRET);

      if (!response.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' });
      }

      if (decodedToken.name !== 'maximus') {
        return response
          .status(401)
          .json({ error: 'You are not authorized to add items to shop' });
      }

      const existingCountry = await Country.findOne({ country: country });
      if (!existingCountry) {
        await new Country({ country: country }).save();
      }

      const existingCategory = await Category.findOne({ category: category });
      if (!existingCategory) {
        await new Category({ category: category }).save();
      }

      const categoryId = await Category.findOne({ category });
      const countryId = await Country.findOne({ country });

      const newItem = new Goods({
        nameOfGoods,
        amountOfGoods,
        priceOfGoods,
        imagePath: `${imagePath}`,
        category: categoryId._id,
        country: countryId._id,
      });

      await newItem.save();

      response
        .status(201)
        .json({ message: 'New item saved', 'new item': newItem.toJSON() });
    } catch (e) {
      console.error(e);
      response.status(500).json({ message: 'Something goes wrong, try again' });
    }
  }
);

module.exports = goodsRouter;
