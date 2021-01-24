const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
const formData = require("express-form-data");
const usersRouter = require("./routes/users");
const loginRouter = require("./routes/login");
const goodsRouter = require("./routes/goods");
const imgRouter = require("./routes/img");
const orderRouter = require("./routes/orders");
const blogsRouter = require("./routes/blogs");
const imagesRouter = require("./routes/images");
// const imageUploadRouter = require("./routes/uploads");
const path = require("path");
const crypto = require("crypto");
const multer = require("multer");
const bodyParser = require("body-parser");
// const GridFsStorage = require('multer-gridfs-storage')
// const Grid = require('gridfs-stream')
const fs = require("fs");

logger.info("connecting to MongoDB");

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connection to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(bodyParser.json());
// app.use(formData.parse())

app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use("/api/login", loginRouter);
app.use("/api/users", usersRouter);
app.use("/api/goods", goodsRouter);
app.use("/api/img", imgRouter);
app.use("/api/orders", orderRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/images", imagesRouter);

// app.use('/api/uploads', imageUploadRouter)

// let conn = mongoose.createConnection(config.MONGODB_URI)
// let gfs

// conn.once('open', () => {
//   console.log('Connection Successful')
//   //initialize our stream
//   gfs = Grid(conn.db, mongoose.mongo)
//   gfs.collection('imageUpload')
// })

const imageSchema = new mongoose.Schema({
  name: String,
  desc: String,
  img: {
    data: Buffer,
    contentType: String,
  },
});

const Image2 = mongoose.model("Image2", imageSchema);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    console.log("test 123", file);
    // cb(null, file.fieldname + '-' + Date.now());
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    console.log("wrong file extension");
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter });

app.post("/api/uploads", upload.single("image"), async (req, res, next) => {
  console.log("POST !!!", req);
  try {
    const { filename, path: filepath, mimetype } = req.file;
    console.log(filename, filepath, mimetype);
    const image = new Image2;
    image.name = filename;
    image.desc = "image";
    image.img.data = fs.readFileSync(path.join(__dirname, filepath));
    image.img.contentType = mimetype;
    const result = await image.save();
    console.log(111, result);

    return res.status(201).json({
      message: "File uploded successfully",
    });
  } catch (error) {
    console.error(error);
  }
});

// let storage = new GridFsStorage({
//   url: config.MONGODB_URI,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err)
//         }
//         const filename = file.originalname

//         const fileInfo = {
//           filename: filename,
//           bucketName: 'uploads',
//         }
//         resolve(fileInfo)
//       })
//     })
//   },
// })

// const upload = multer({ storage })

app.get("/api/uploads", (req, res) => {
  return res.send("ping ping");
});

// app.post("/api/uploads", upload.single("image"), (req, res) => {
//   res.json({ file: req.file });
// });

// app.post('/api/uploads', upload.single('image'), (req, res, err) => {
//   if (err) throw err
//   res.json({ file: req.file });
//   // res.status(201).send()
// })

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
