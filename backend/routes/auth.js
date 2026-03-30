const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "amruta";

// CREATE USER → POST /api/auth/createuser
router.post(
  "/createuser",

  body("name", "Enter a valid name").isLength({ min: 3 }),
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password must be at least 5 characters").isLength({
    min: 5,
  }),
  async (req, res) => {
    try {
      // validation check
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // check if user already exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          error: "User with this email already exists",
        });
      }

      // hash password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // create user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);

      res.json({ authtoken });
      // // send response
      // res.json({
      //   success: true,
      //   user: user,
      // });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  },
);

// LOGIN USER → POST /api/auth/login
router.post(
  "/login",
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password cannot be blank").exists(),
  async (req, res) => {
    try {
      // validation check
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      // check user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          error: "Invalid credentials",
        });
      }

      // compare password
      const passwordCompare = await bcrypt.compare(password, user.password);

      if (!passwordCompare) {
        return res.status(400).json({
          error: "Invalid credentials",
        });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ authtoken });

      // success response
      // const data = { user: { id: user.id } };
      // const authToken = jwt.sign(data, process.env.JWT_SECRET);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  },
);

//route 3 : get loggedin user details
router.post(
  "/getuser",
  //body('email',"enter valid email").isEmail(),
  //body("password","password cannot be blank").exists(),
  fetchuser,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  },
);

module.exports = router;
