"use strict";

let mongoose = require("mongoose");
let moment = require("moment");


let jobSchema = new mongoose.Schema({
    id: {type: Number},
    posted_date: {type: String},
    organization: {type: String},
    location: {type: String},
    applicants: {type: Number},
    score: {type: Number},
    contract_type: {type: String},
    job_title: {type: String},
    image: {type: String}
});


let Job = mongoose.model("Job", jobSchema);

let initialData = [
    {
        id: 1,
        posted_date: "2016-08-01T05:00:00.000Z",
        organization: "Optix Family Eye Care",
        location: "Plainview, NY",
        applicants: 5,
        score: 95,
        contract_type: "FT",
        job_title: "Optometrist",
        image: "1.jpg"
    },
    {
        id: 2,
        posted_date: "2016-08-03T05:00:00.000Z",
        organization: "Optix Family Eye Care",
        location: "Plainview, NY",
        applicants: 5,
        score: 90,
        contract_type: "FT",
        job_title: "Optician",
        image: "1.jpg"
    },
    {
        id: 3,
        posted_date: "2016-08-09T05:00:00.000Z",
        organization: "SVS Vision",
        location: "San Diego, CA",
        applicants: 2,
        score: 88,
        contract_type: "PT",
        job_title: "Optician",
        image: "2.png"
    },
    {
        id: 4,
        posted_date: "2016-08-05T05:00:00.000Z",
        organization: "Mott Optical",
        location: "San Diego, CA",
        applicants: 10,
        score: 80,
        contract_type: "FT",
        job_title: "Opthalmic Technician",
        image: "3.png"
    },
    {
        id: 5,
        posted_date: "2016-08-04T05:00:00.000Z",
        organization: "Mott Optical",
        location: "San Diego, CA",
        applicants: 8,
        score: 75,
        contract_type: "FT",
        job_title: "Front Desk Receptionist",
        image: "3.png"
    }
];

/*for (let jobPost of initialData) {
    Job.create(jobPost);
}*/
module.exports = Job;