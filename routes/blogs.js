const blogsRouter = require('express').Router();
const Blog = require('../models/blogs.js');
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const multer = require('multer');

blogsRouter.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.json(blogs.map((blog) => blog.toJSON()));
  } catch (e) {
    console.error(e);
  }
});

//upload file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'build/static/img_blog');
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

blogsRouter.post('/img', upload.single('image'), async (req, res) => {
  try {
    const { filename, path: filepath, mimetype } = req.file;

    return res.status(201).json({
      message: 'File uploaded successfully',
    });
  } catch (e) {
    console.error(e);
  }
});
// end upload

blogsRouter.post('/', async (req, res) => {
  const body = req.body;
  const decodedToken = jwt.verify(res.token, process.env.SECRET);
  if (!res.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  if (decodedToken.name !== 'maximus') {
    return res
      .status(401)
      .json({ error: 'You are not authorized to add new blog' });
  }

  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: user.name,
    content: body.content,
    imgPath: body.imgPath,
    likes: 0,
    date: new Date(),
    user: user._id,
  });

  const savedBlog = await blog.save();

  res.status(201).json(savedBlog.toJSON());
});

blogsRouter.put('/:id', async (req, res) => {
  console.log(111, req.body);

  // const body = req.body;
  // const decodedToken = jwt.verify(res.token, process.env.SECRET);

  // if (!res.token || !decodedToken.id) {
  //   return res.status(401).json({ error: 'you are not authorized' });
  // }

  const likes = req.body.likes;
  const updatedObject = await Blog.findByIdAndUpdate(
    req.params.id,
    {
      likes: likes,
    },
    { new: true }
  );
  res.status(200).json(updatedObject.toJSON());
});

blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
  } catch (e) {
    console.log('Error: ', e);
  }
  response.status(200).json({ message: 'Blog succesfully deleted' });
});

module.exports = blogsRouter;
