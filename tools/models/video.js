"use strict";

let mongoose = require("mongoose");

let videoSchema = new mongoose.Schema({
    awsLink: {type: String},
    awsKey: {type: String},
    eTag: {type: String},
    uploadedBy: {type: mongoose.Schema.Types.ObjectId},
    employerQuestion: {type: Boolean}
});


videoSchema.statics.saveInDB = function (dataToSave, callback) {
    Video.create(dataToSave, (error, savedVideo) => {
        return callback(error, savedVideo);
    });
};

let Video = mongoose.model("Video", videoSchema);

module.exports = Video;