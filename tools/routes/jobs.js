"use strict";

const express = require("express");
const router = express.Router();

const Job = require("../models/jobs");


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

router.get("/:employerId", (request, response) => {
    Job.findById(request.params.employerId, (error, jobData) => {
       if (error || !jobData) return response.status(400).send(error || {error: "There is no data"});
        response.send(jobData);
    });
});


module.exports = router;