// const config = require('../utils/config');
// const crypto = require('crypto')
const imageUploadRouter = require("express").Router();
// const mongoose = require('mongoose')
// const multer = require('multer')
// const GridFsStorage = require('multer-gridfs-storage')
// const Grid = require('gridfs-stream');

// const conn = mongoose.createConnection(config.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true
// })

// let gfs;

// conn.once('open', () => {
//   //Init stream
//   gfs = Grid(conn.db, mongoose.mongo)
//   gfs.collection('uploads')
// })

// //Create storage engine
// const storage = new GridFsStorage({
//   url: config.MONGODB_URI,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err);
//         }
//         const filename = buf.toString('hex') + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename,
//           bucketName: 'uploads'
//         };
//         resolve(fileInfo);
//       });
//     });
//   }
// });

// const upload = multer({ storage });

// imageUploadRouter.post('/', upload.single('myFile'), (req, res) => {
//   res.json({ file: req.file })
//   // res.redirect('/')
// })

imageUploadRouter.get("/", (req, res) => {
  return res.send('ping ping');
});


// imageUploadRouter.post("/", upload.single(), async (req, res) => {
//   const body = req.body;
//   res.json({ file: req.file })

//   console.log(1234567)
//   console.log('Body: ', body);

//   return response.status(200);

// });

imageUploadRouter.post("/", (req, res) => {
  const body = req.body;
  console.log('Body555: ', body);
  res.json(req.file);
});



module.exports = imageUploadRouter