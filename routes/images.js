const imagesRouter = require("express").Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const Image2 = require('../models/image')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
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

imagesRouter.post('/', upload.single('image'), async (req, res) => {
  console.log('POST!!!', req.file);
  try {
    const { filename, path: filepath, mimetype } = req.file
    console.log('filename:', filename, 'filepath:', filepath, 'mimetype:', mimetype);
    const image = new Image2
    image.name = filename
    image.desc = 'image'
    image.img.data = fs.readFileSync(path.normalize(`${__dirname}/..//${filepath}`),
      (err, data) => {
        if (err) throw err
        console.log(data)
      })
    image.img.contentType = mimetype
    const result = await image.save()

    return res.status(201).json({
      message: 'File uploaded successfully'
    })
  } catch (e) {
    console.error(e)
  }
})

imagesRouter.get("/", async (req, res) => {
  try {
    const images = await Image2.find({});
    console.log(3733737, images);
    const idArray = images.map(el => {
      return { id: el._id, name: el.name }
    })
    console.log(888888, idArray);
    res.status(200).json(idArray)
  } catch (e) {
    console.error('Error: ', e)
  }
});

imagesRouter.get("/:id", async (req, res) => {
  try {
    const image = await Image2.findById(req.params.id);
    res.set('Content-Type', image.img.contentType).send(image.img.data)
  } catch (e) {
    console.error('Error: ', e);
  }
});

imagesRouter.delete("/:id", async (request, response) => {
  try {
    await Image2.findByIdAndRemove(request.params.id);
  } catch (e) {
    console.error('Error: ', e);
  }
  response.status(200).json({ message: 'Image succesfully deleted' });
});


// imagesRouter.get('/', (req, res) => {
//   return res.send('ping ping');
// })

module.exports = imagesRouter;