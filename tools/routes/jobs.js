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


module.exports = router;