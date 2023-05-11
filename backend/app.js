const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const registrationRouter = require("./routers/registration");
const adminRouter = require("./routers/admin");
const cookieParser = require("cookie-parser");
require("dotenv").config();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("tiny"));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/joe", require("./routers/token")  );

app.use(registrationRouter);
app.use("/admin/add", adminRouter);

mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.mongoDbUrl)
  .then(() => {
    app.listen(process.env.PORT || 3001, () => {
      console.log(
        `Connected to the DataBase ... listening on port ${
          process.env.PORT || 3001
        }`
      );
    });
  })
  .catch(() => {
    console.log("Couldn't connect to the DataBase");
  });
