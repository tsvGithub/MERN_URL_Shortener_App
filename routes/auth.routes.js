const { Router } = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const router = Router();

// router.post("/register", async (req, res) => {
//   const { email, password } = req.body;
//   const user = new User({ email, password });

//   await user.save();

//   res.status(201).json({ message: "User has been created" });
// });
//=======================

// /api/auth/register
router.post(
  "/register",
  //middleware before (req,res)
  //express-validator validates email + password
  [
    //   email validate  is error?     chack email
    check("email", "Email is invalid").isEmail(),
    //   password validate      is error?                         check if is 6 symbols
    check("password", "Minimum password length is 6 symbols").isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      console.log(`reg.body: ${req.body}`);
      //validation data:
      const errors = validationResult(req);
      console.log(errors);
      //if errors, return them to FE
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect registration data",
        });
      }
      //----------------------------------
      //request from FE
      const { email, password } = req.body;
      console.log(`server=>routes=>auth.route.js req.body:${req.body}`);
      console.log(JSON.stringify(req.body));
      //check User if exists
      const existenUser = await User.findOne({ email });
      if (existenUser) {
        return res.status(400).json({ message: "User already exist, do you want to login instead?" });
      }
      //register new User
      //hash password received from FE
      const hashedPassword = await bcrypt.hash[(password, 12)];
      const user = new User({ email, password: hashedPassword });
      // const user = new User({ email, password });

      await user.save();

      res.status(201).json({ message: "User created" });
    } catch (error) {
      throw Error(`Error on registering new User: ${error}`);
    }
  }
);
//==================================
// /api/auth/login
// router.post(
//   "/login",
//   //validate email & password
//   [check("email", "Enter correct email").normalizeEmail().isEmpty(), check("password", "Enter your password").exists()],
//   async (req, res) => {
//     try {
//       //validation data
//       const errors = validationResult(req);
//       //if errors, return them to FE
//       if (!errors.isEmpty()) {
//         return res.status(400).json({
//           errors: errors.array(),
//           message: "Incorrect login data",
//         });
//       }
//       //request from FE
//       const { email, password } = req.body;
//       //check if email exist
//       const user = await User.findOne({ email });
//       //one user=one email => if email not found
//       if (!user) {
//         return res.status(400).json({ message: "User not found" });
//       }
//       //if OK, compare password         password from FE, password from DB
//       const isMatch = await bcrypt.compare(password, user.password);
//       //if isMatch is false (passwords not equal)
//       if (!isMatch) {
//         return res.status(400).json({ message: "Incorrect password, please, try again" });
//       }
//       //jwt token 1h
//       const token = jwt.sign({ userId: userId }, config.get("jwtSecret"), { expiresIn: "1h" });
//       res.json({ token, userId: user.id });
//     } catch (error) {
//       res.status(500).json({ message: "Something went wrong!" });
//     }
//   }
// );

module.exports = router;
