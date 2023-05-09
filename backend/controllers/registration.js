const studentModel = require("../models/student");
const instructorModel = require("../models/instructor");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const checkEmail = await studentModel.findOne({ email }); //if found return the object if not return null
    const checkUsername = await studentModel.findOne({ username }); //if found return the object if not return null
    if (checkEmail) {
      res.send({ msg: "Email is Taken" });
    } else if (checkUsername) {
      res.send({ msg: "Username is Taken" });
    } else {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const newStudent = new studentModel({
        username,
        email,
        password: hashedPassword,
      });
      newStudent.save();
      res.send({ user: newStudent, msg: "User added" });
    }
  } catch (err) {
    res.json({ msg: "DATABASE ERROR" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkAsStudent = await studentModel.findOne({ email }); //if found return the object if not return null
    const checkAsInstructor = await instructorModel.findOne({ email }); //if found return the object if not return null
    // console.log(checkAsStudent);
    // console.log(checkAsInstructor);

    if (checkAsStudent) {
      if (await bcrypt.compare(password, checkAsStudent.password))
        res.send({
          user: checkAsStudent,
          msg: "Logged in successfully",
          student: true,
        });
      else res.send({ msg: "Wrong password" });
    } else {
      if (checkAsInstructor) {
        console.log("xxxxxxxxxxxxxxxx");
        if (await bcrypt.compare(password, checkAsInstructor.password))
          res.send({
            user: checkAsInstructor,
            msg: "Logged in successfully",
            student: false,
          });
        else res.send({ msg: "Wrong password" });
      } else {
        res.send({ msg: "Not exist" });
      }
    }
  } catch (err) {
    res.json("DATABASE ERROR");
  }
};

module.exports = { register, login };
