const imagesRouter = require("express").Router()
const path = require('path')
const fs = require('fs')
const ImgModel = require('../models/image');

const imgPath = path.join(__dirname, '/uploads/', 'test.png');

//Uploading the image
imagesRouter.post('/', async (req, res, next) => {
  try {
    const newImage = new ImgModel({
      img: {
        data: fs.readFileSync(imgPath),
        contentType: 'image/png'
      }
    })
    await newImage.save()
    response.status(201).json({ message: 'New image saved' })
  } catch (e) {
    response.status(500).json({ message: 'Something goes wrong, try again' })
  }
});

// imagesRouter.get('/', async (req, res) => {
//   const images = await ImgModel.find({})
//   response.json(images.map((u) => u.toJSON()));
// })

module.exports = imagesRouter;