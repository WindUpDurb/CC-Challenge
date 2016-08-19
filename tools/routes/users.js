"use strict";

const express = require("express");
const router = express.Router();
const multer = require("multer");

const User = require("../models/user");
const Employer = require("../models/employer");
const S3 = require ('../models/s3-storage');
const Video = require("../models/video");
const Job = require("../models/jobs");

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

router.post("/uploadQuestionToAWS/:jobID/:employerID", upload.single("newVideo"), (request, response) => {
    S3.upload(request.file, (error, uploadedVideo) => {
        if (error) response.status(400).send(error);
        let videoToSave = {
            awsLink: uploadedVideo.Location,
            awsKey: uploadedVideo.Key,
            etag: uploadedVideo.ETag,
            employerQuestion: true,
            uploadedBy: request.params.employedID
        };
        Video.saveInDB(videoToSave, (error, savedVideo) => {
            if (error) response.status(400).send(error);
            let toUpdateEmployer = {
                videoId :savedVideo._id,
                jobId: request.params.jobID
            };
            Employer.addVideoQuestion(toUpdateEmployer, (error, savedUser) => {
                Job.addVideoQuestion(request.params.jobID, savedVideo._id, (error, savedJob) => {
                    if (error) response.status(400).send(error);
                    response.send({savedVideo, savedUser, savedJob});
                });
            });
        });
    });
});

router.post("/uploadResponseToAWS/:jobID/:userID", upload.single("newVideo"), (request, response) => {
    S3.upload(request.file, (error, uploadedVideo) => {
        if (error) response.status(400).send(error);
        let videoToSave = {
            awsLink: uploadedVideo.Location,
            awsKey: uploadedVideo.Key,
            etag: uploadedVideo.ETag,
            uploadedBy: request.params.userID
        };
        Video.saveInDB(videoToSave, (error, savedVideo) => {
            if (error) response.status(400).send(error);
            let toUpdateUser = {
                videoId: savedVideo._id,
                jobId: request.params.jobID
            };
            User.addVideoQuestion(toUpdateUser, (error, savedUser) => {
                Job.addVideoResponse(request.params.jobID, savedVideo._id, (error, savedJob) => {
                    if (error) response.status(400).send(error);
                    response.send({savedVideo, savedUser, savedJob});
                });
            });
        });
    });
});


module.exports = router;