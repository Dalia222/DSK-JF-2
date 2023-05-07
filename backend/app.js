const express = require("express");
const app = express();
const port = 3000;
require("dotenv").config();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/signUp/post", (req, res) => {
  console.log("xx");
  res.send(req.body);
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Example app listening on port ${port}`);
});
