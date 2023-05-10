const studentModel = require("../models/student");
const instructorModel = require("../models/instructor");
const bcrypt = require("bcrypt");

const student = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const checkEmailFromStudent = await studentModel.findOne({ email }); //if found return the object if not return null
    const checkUsernameFromStudent = await studentModel.findOne({ username }); //if found return the object if not return null

    const checkEmailFromInstructor = await instructorModel.findOne({ email }); //if found return the object if not return null
    const checkUsernameFromInstructor = await instructorModel.findOne({
      username,
    }); //if found return the object if not return null

    if (checkEmailFromStudent || checkEmailFromInstructor) {
      res.send({ msg: "Email is Taken" });
    } else if (checkUsernameFromStudent || checkUsernameFromInstructor) {
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
      res.send({ user: newStudent, msg: "Student added" });
    }
  } catch (err) {
    res.json({ msg: "DATABASE ERROR" });
  }
};

const instructor = async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;
  try {
    const checkEmailFromStudent = await studentModel.findOne({ email }); //if found return the object if not return null
    const checkUsernameFromStudent = await studentModel.findOne({ username }); //if found return the object if not return null

    const checkEmailFromInstructor = await instructorModel.findOne({ email }); //if found return the object if not return null
    const checkUsernameFromInstructor = await instructorModel.findOne({
      username,
    }); //if found return the object if not return null

    if (checkEmailFromStudent || checkEmailFromInstructor) {
      res.send({ msg: "Email is Taken" });
    } else if (checkUsernameFromStudent || checkUsernameFromInstructor) {
      res.send({ msg: "Username is Taken" });
    } else {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      const newInstructor = new instructorModel({
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword,
      });
      newInstructor.save();
      res.send({ user: newInstructor, msg: "User added" });
    }
  } catch (err) {
    res.json({ msg: "DATABASE ERROR" });
  }
};

const course = async (req, res) => {};

module.exports = { student, instructor, course };
