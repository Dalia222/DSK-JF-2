const userModel = require("../models/user");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const checkEmail = await userModel.findOne({ email }); //if found return the object if not return null
    const checkUsername = await userModel.findOne({ username }); //if found return the object if not return null
    if (checkEmail) {
      res.send({ msg: "Email is Taken" });
    } else if (checkUsername) {
      res.send({ msg: "Username is Taken" });
    } else {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      console.log(hashedPassword);

      const newUser = new userModel({
        username,
        email,
        password: hashedPassword,
      });
      newUser.save();
      res.send({ user: newUser, msg: "User added" });
    }
  } catch (err) {
    res.json({msg:"DATABASE ERROR"});
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const check = await userModel.findOne({ email }); //if found return the object if not return null
    if (check) {
      if (await bcrypt.compare(password, check.password))
        res.send({ user: check, msg: "Logged in successfully" });
      else res.send({ msg: "Wrong password" });
    } else {
      res.send({ msg: "Not exist" });
    }
  } catch (err) {
    res.json("DATABASE ERROR");
  }
};

module.exports = { register, login };
