"use strict";

const express = require("express");
const router = express.Router();

router.use("/users", require("./users"));
router.use("/jobs", require("./jobs"));

module.exports = router;