const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const { check, validationResult } = require('express-validator')
const User = require("../models/users");


// /api/users/

usersRouter.get("/", async (request, response) => {
  const users = await User.find({});
  response.json(users.map((u) => u.toJSON()));
});

usersRouter.post("/",
  [
    // check('username')
    //   .trim()
    //   .isAlphanumeric().withMessage('Must be letters or numbers only')
    //   .isLength({ min: 3 }).withMessage('Must be more then 3 symbols'),
    check('name')
      .trim()
      .isAlphanumeric().withMessage('Must be letters or numbers only')
      .isLength({ min: 3 }).withMessage('Must be more then 3 symbols'),
    check('email', 'Wrong e-mail').trim().normalizeEmail().isEmail(),
    check('password')
      .trim()
      .matches(/\d/).withMessage('Password must contain a number')
      .isLength({ min: 6 }).withMessage('Minimum length is 6 symbols')
  ],
  async (request, response) => {
    try {
      const errors = validationResult(request)

      if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array(), message: 'Wrong registration data' })
      }
      const { name, email, password } = request.body

      const candidate = await User.findOne({ email: email })
      if (candidate) {
        return res.status(400).json({ message: `User already exists ` })
      }

      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      const user = new User({
        // username,
        name,
        email,
        date: new Date(),
        passwordHash,
      });

      await user.save()
      response.status(201).json({ message: 'User created' })
    } catch (e) {
      response.status(500).json({ message: 'Something goes wrong, try again' })
    }
  })

module.exports = usersRouter;