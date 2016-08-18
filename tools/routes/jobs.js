"use strict";

const express = require("express");
const router = express.Router();

const Job = require("../models/jobs");
const Video = require("../models/video");


router.get("/", (request, response) => {
    Job.find({}, (error, jobList) => {
        if (error) return response.status(400).send(error);
        response.send(jobList);
    });
});

router.get("/:jobId", (request, response) => {
    Job.findById(request.params.jobId, (error, jobList) => {
        if (error) return response.status(400).send(error);
        response.send(jobList);
    });
});

router.get("/videoLink/:videoId", (request, response) => {
    console.log("herere")
    Video.findById(request.params.videoId, (error, videoDB) => {
        if (error || !videoDB) return response.status(400).send(error || {error: "No video"});
        console.log("and here: ", error, videoDB)
        response.send(videoDB);
    });
});

router.get("/:employerId", (request, response) => {
    Job.findById(request.params.employerId, (error, jobData) => {
       if (error || !jobData) return response.status(400).send(error || {error: "There is no data"});
        response.send(jobData);
    });
});


module.exports = router;