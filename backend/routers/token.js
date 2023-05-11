const express = require("express");
const router = express.Router();
const joe = require("../controllers/token")


router.get("/",joe );

module.exports = router;
