const jwt = require("jsonwebtoken");


const joe = (req, res) => {
  const token = jwt.sign("x", process.env.secretKey);
  res.cookie("token", token);
  res.send({
    msg: "Logged in successfully",
    student: true,
  });
};

module.exports = joe;