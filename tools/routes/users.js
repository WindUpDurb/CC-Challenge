"use strict";

const express = require("express");
const router = express.Router();
const multer = require("multer");

const User = require("../models/user");
const S3 = require ('../models/s3-storage');

const upload = multer({storage: multer.memoryStorage()});

router.post("/login", (request, response) => {
    User.authenticate(request.body, function (error, userData) {
        if (error) return response.status(400).send(error);
        response.send(userData);
    });
});

router.post("/uploadToAWS", upload.any(), (request, response) => {
    console.log("Before: ");
    console.log("File: ", request.file);
    console.log("Files: ", request.files);
    console.log("Body: ", request.body);
    response.send();
});

module.exports = router;