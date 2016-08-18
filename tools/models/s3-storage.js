"use strict";

const AWS = require("aws-sdk");
const uuid = require("uuid");

const s3 = new AWS.S3();

const bucketName = "covalent-careers-test";
const urlBase = "https://s3-us-west-1.amazonaws.com";

const S3Tasks = {
    upload: function (videoObject, callback) {
        let extension = videoObject.originalname.split(".").pop();
        let key = uuid() + `.${extension}`;
        let params = {
            Bucket: bucketName,
            Key: key,
            ACL: "public-read",
            Body: videoObject.buffer,
            ContentType: "video/webm"
        };
        //if issues, try the initial putObject method instead of upload
        s3.upload(params, function (error, result) {
            if (error) return callback(error);
            let fileUrl = `${urlBase}/${bucketName}/${key}`;
            let toReturn = result;
            toReturn.fileUrl = fileUrl;
            callback(error, toReturn);
        });
    },
    retrieveVideo: function (callback) {
        let params = {
            Bucket: bucketName,
            Key: "f39ac45f-be65-46df-9126-d4cd5e4c9215.blob"
        };
        s3.getObject(params, function (error, data) {
            return callback(error, data);
        });
    }

};

module.exports = S3Tasks;