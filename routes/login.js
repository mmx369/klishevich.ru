const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { check, validationResult } = require('express-validator')
const loginRouter = require("express").Router();
const User = require("../models/users");


// /api/login/

loginRouter.post("/",
  [
    check('name', 'Username not found').exists(),
    check('password', 'Enter password').exists()
  ],

  async (request, response) => {
    try {
      const errors = validationResult(request)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: 'Wrong username or password' })
      }
      console.log(333333, request.body)
      const { name, password } = request.body
      const user = await User.findOne({ name });
      console.log(4444, user)
      if (!user) {
        return response.status(400).json({ message: 'User not found' })
      }

      const isMatch = await bcrypt.compare(password, user.passwordHash)

      console.log(5555, isMatch);

      if (!isMatch) {
        return res.status(401).json({ error: 'Wrong password, try again' })
      }

      const userForToken = {
        name: user.name,
        id: user._id,
      };

      console.log(6666, userForToken);

      const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: '1h' });

      console.log(7777, token)

      response
        .status(200)
        .send({ token, userId: user._id, name: user.name });

    } catch (e) {
      response.status(500).json({ message: 'Something goes wrong, try again' })
    }
  });

module.exports = loginRouter;