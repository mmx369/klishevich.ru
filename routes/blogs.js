const blogsRouter = require("express").Router();
const Blog = require("../models/blogs.js");
const User = require("../models/users");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  // const blogs = await Blog.find({}).skip(1).limit(5)
  const blogs = await Blog.find({})
  response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const decodedToken = jwt.verify(response.token, process.env.SECRET);
  if (!response.token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: user.name,
    content: body.content,
    likes: 0,
    date: new Date(),
    user: user._id,
  });

  const savedBlog = await blog.save();

  response.status(201).json(savedBlog.toJSON());
});

blogsRouter.put("/:id", async (request, response) => {
  const likes = request.body.likes;
  const updatedObject = await Blog.findByIdAndUpdate(request.params.id, {
    likes: likes,
  }, { new: true })
  response.status(200).json(updatedObject.toJSON());
})

blogsRouter.delete("/:id", async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
  } catch (e) {
    console.log('Error: ', e);
  }
  response.status(200).json({ message: 'Blog succesfully deleted' });
});

module.exports = blogsRouter;