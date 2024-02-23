const userModel = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
class Login {
  static login = async (req, res, next) => {
    try {

      const { email, password } = req.body;
      const user = await userModel.findOne({ email });
      if (user) {
        const match = await bcrypt.compare(password, user.password);

        if (match) {

          const token = jwt.sign({ name: user.name, id: user.id }, process.env.JWT_KEY, { expiresIn: "30d" });
          res.cookie("t_user", token, { maxAge: 30 * 24 * 60 * 60 * 1000 });
          res.cookie('t_role', user.role, { maxAge: 30 * 24 * 60 * 60 * 1000 })
          return res.json({
            message: 'successful',
          });
        }
      } else {
        return res.status(401).json({
          message: false,
          err: 'False login/password'
        });
      }
    } catch (err) {
      return res.status(401).json({ err: err.mesage || err });
    }
  };

  static registr = async (req, res, next) => {
    try {
      if (!(req.body.name && req.body.email && req.body.password)) {
        return res.status(401).json({ errorMessage: "not valid data" });
      }
      const { email, name, password } = req.body;
      const getUser = await userModel.findOne({ email })
      if (getUser) {
        console.log(getUser)
        return res.status(401).json({ errorMessage: "email is exist" });
      }

      bcrypt.genSalt(10, function (err, salt) {
        if (err) {
          next(err);
        } else {
          bcrypt.hash(password, salt, async (err, hash) => {
            if (err) {
              next(err);
            } else {
              const newUser = new userModel({ email, name, password: hash });
              await newUser.save();
              return res.json({ message: "successful" });
            }
          });
        }
      });
    } catch (err) {
      return res.status(500).json({ errorMessage: err.message || err });
    }
  };

  static logout = async (req, res) => {
    try {
      const cookies = Object.keys(req.cookies);
      cookies.forEach(cookie => {
        res.clearCookie(cookie);
      });
      return res.status(200).json({ status: 'successful' })
    } catch (err) {
      return res.status(520).json({ err: err.message || err })
    }
  }
}
module.exports = Login;
