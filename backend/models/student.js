const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  }
});

const student = mongoose.model("Student", studentSchema);
module.exports = student;
