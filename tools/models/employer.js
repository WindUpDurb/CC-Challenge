"use strict";

let mongoose = require("mongoose");
let bcrypt = require("bcrypt");

let employerSchema = new mongoose.Schema({
    email: {type: String},
    password: {type: String},
    name: {type: String},
    jobs: [{
        jobId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job"
        },
        jobTitle: {type: String},
        organization: {type: String},
        videoQuestion: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Videos"
        },
        videoResponseReceived: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Videos"
        }

    }]
});

employerSchema.statics.addVideoQuestion = (uploadedData, callback) => {
    Employer.findOne({email: "employer@employer.com"}, (error, databaseUser) => {
        if (error || !databaseUser) return callback(error || {error: "Login Information is Invalid."});
        let indexOfJobs = databaseUser.jobs.findIndex(element => element.jobId == uploadedData.jobId);
        if (indexOfJobs === -1) return callback({error: "Job isn't found."});
        databaseUser.jobs[indexOfJobs].videoQuestion = uploadedData.videoId;
        databaseUser.save((error, savedUser) => {
            return callback(error, savedUser);
        });
    });
};

employerSchema.statics.authenticate = (loginData, callback) => {
    Employer.findOne({ email : loginData.email })
        .populate("jobId")
        .exec((error, databaseUser) => {
        if (error || !databaseUser || databaseUser.password !== loginData.password) {
            return callback(error || {error: "Login Information is Invalid."});
        }
        return callback(null, databaseUser);
    });
};

let Employer = mongoose.model("Employer", employerSchema);


/*Employer.create({
    email: "employer@employer.com",
    password: "employer",
    name: "Dr. John Doe",
    jobs: [
        {
            jobId: "57b6625199fe8b2d3add80dd",
            jobTitle: "Optometrist",
            organization: "Optix Family Eye Care"
        },
        {
            jobId: "57b6625199fe8b2d3add80de",
            jobTitle: "Optician",
            organization: "Optix Family Eye Care"
        }
    ]
});*/

module.exports = Employer;