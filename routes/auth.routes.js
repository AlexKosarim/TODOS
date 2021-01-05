const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const router = Router();
const User = require("../models/User");

// /api/auth/register
router.post(
  "/signup",
  [
    check("username", "Incorrect email").isEmail(),
    check("password", "Minimum length is 6 symbols").isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          errors: errors.array(),
          message: "Incorrect data on registration",
        });
      }
      const { username, password } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res.status(400).json({ message: "User is existed already" });
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({
        username,
        password: hashedPassword,
      });
      await user.save((err) => console.log(err));
      // res.status(201).json({ message: "User has been created!" });
      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "1h",
      });

      res.json({ token, userId: user.id });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Something went wrong! Try again!" });
    }
  }
);

// /api/auth/login
router.post(
  "/signin",
  [
    check("username", "Input correct emails").normalizeEmail().isEmail(),
    check("password", "Input password").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({
          errors: errors.array(),
          message: "Incorrect credentials",
        });
      }

      const { username, password } = req.body;
      console.log("username=", username);
      const user = await User.findOne({ username });
      console.log("user=", user);
      if (!user) {
        return res
          .status(400)
          .json({ message: "There is no user with such credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Incorrect username/password" });
      }

      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "10s",
      });

      res.json({ token, userId: user.id });
    } catch (e) {
      res.status(500).json({ message: "Something went wrong! Try again!" });
    }
  }
);

module.exports = router;
