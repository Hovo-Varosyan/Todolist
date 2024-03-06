const userModel = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const schema = require("../validate/login");

class Login {
  static login = async (req, res, next) => {
    try {
      const { error, value } = schema.validate(req.body)

      if (error) {
        return res.status(401).json({ err: error.message })
      }
      const { email, password } = req.body;
      const user = await userModel.findOne({ email });
      if (user) {
        const match = await bcrypt.compare(password, user.password);

        if (match) {

          const token = jwt.sign({ name: user.name, id: user.id }, process.env.JWT_KEY, { expiresIn: "30d" });
          res.cookie("t_user", token, { maxAge: 30 * 24 * 60 * 60 * 1000 , httpOnly:true });
          res.cookie('t_role', user.role, { maxAge: 30 * 24 * 60 * 60 * 1000 })
          res.cookie('t_id', String(user._id), { maxAge: 30 * 24 * 60 * 60 * 1000 })

          return res.json({
            message: 'successful',
          });

        } else {
          return res.status(401).json({
            message: false,
            err: 'False login/password'
          });
        }
      } else {
        return res.status(401).json({
          message: false,
          err: 'False login/password'
        });
      }
    } catch (err) {
      return res.status(401).json({ err: err.message || err });
    }
  };

  static registr = async (req, res, next) => {
    try {
      const { error, value } = schema.validate(req.body, { context: { isRequired: true } })
      if (error) {
        return res.status(401).json({ err: error.message })
      }
      const { email, name, password } = req.body;

      bcrypt.genSalt(10, function (err, salt) {
        if (err) {
          next(err);
        } else {
          bcrypt.hash(password, salt, async (err, hash) => {
            if (err) {
              next(err);
            } else {
              try {
                const newUser = new userModel({ email, name, password: hash });
                await newUser.save();

              } catch (error) {
                return res.status(500).json({ err: error.code || err });
              }
              return res.json({ message: "successful" });
            }
          });
        }
      });
    } catch (error) {
      return res.status(401).json({ err: error });
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
