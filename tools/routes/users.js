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

router.post("/uploadToAWS", upload.single("newVideo"), (request, response) => {
    console.log("File: ", request.file);
    S3.upload(request.file, (error, results) => {
        console.log("Error: ", error);
        console.log("Results: ", results)
        response.send();
    });
});

router.get("/retrieveVideo", (request, response) => {
    S3.retrieveVideo((error, data) => {
        if (error) response.status(400).send(error);
        console.log("Data: ", data);
        response.send(data);
    });
});

module.exports = router;