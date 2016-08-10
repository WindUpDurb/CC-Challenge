"use strict";

"use strict";

const express = require("express");
const router = express.Router();

const BlogResources = require("../models/blogResources");


router.get("/", (request, response) => {
    BlogResources.find({}, (error, jobList) => {
        if (error) return response.status(400).send(error);
        response.send(jobList);
    });
});


module.exports = router;