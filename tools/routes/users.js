"use strict";

const express = require("express");
const router = express.Router();

const User = require("../models/user");

router.post("/login", (request, response) => {
    User.authenticate(request.body, function (error, userData) {
        if (error) return response.status(400).send(error);
        response.send(userData);
    });
});

module.exports = router;