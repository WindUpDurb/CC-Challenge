"use strict";

const express = require("express");
const router = express.Router();
const multer = require("multer");

const User = require("../models/user");
const Employer = require("../models/employer");
const S3 = require ('../models/s3-storage');
const Video = require("../models/video");

const upload = multer({storage: multer.memoryStorage()});

router.post("/login", (request, response) => {
    User.authenticate(request.body, function (error, userData) {
        if (error) return response.status(400).send(error);
        response.send(userData);
    });
});

router.post("/loginEmployer", (request, response) => {
    Employer.authenticate(request.body, function (error, userData) {
        if (error) return response.status(400).send(error);
        response.send(userData);
    });
});

router.post("/uploadQuestionToAWS", upload.single("newVideo"), (request, response) => {
    S3.upload(request.file, (error, uploadedVideo) => {
        if (error) response.status(400).send(error);
        let videoToSave = {
            awsLink: uploadedVideo.Location,
            awsKey: uploadedVideo.Key,
            etag: uploadedVideo.ETag,
            employerQuestion: true,
            uploadedBy: request.body._id
        };
        Video.saveInDB(videoToSave, (error, savedVideo) => {
            if (error) response.status(400).send(error);
            let toUpdateEmployer = {
                videoId :savedVideo._id,
                jobId: request.body.jobId
            };
            Employer.addVideoQuestion(toUpdateEmployer, (error, savedUser) => {
                console.log("Error here: ", error);
                console.log("Saved user: ", savedUser);
                response.send();
            });
        });
    });
});

router.post("/uploadResponseToAWS", upload.single("newVideo"), (request, response) => {
    S3.upload(request.file, (error, results) => {
        if (error) response.status(400).send(error);
        console.log("Results: ", results);
        response.send();
    });
});


module.exports = router;