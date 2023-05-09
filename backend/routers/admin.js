const express = require("express");
const router = express.Router();
const { student, instructor, course } = require("../controllers/admin");

router.post("/student", student);
router.post("/instructor", instructor);
router.post("/course", course);

module.exports = router;
