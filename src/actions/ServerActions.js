"use strict";

import * as actionTypes from "./actionTypes";
import * as JobListActions from "./JobListActions";
import toastr from "toastr";
import {browserHistory} from "react-router";

export function retrieveFromAWS() {
    return function (dispatch) {
        return fetch("/api/users/retrieveVideo")
            .then(response => {
                console.log("Response: ", response);
            })
            .catch(error => {
                console.log("Error: ", error);
            });
    };
}

export function uploadToAWSUser(file, jobId, userId) {
    return function (dispatch) {
        let data = new FormData();
        //the first argument will be the field name
        //that multer is looking for
        data.append("newVideo", file);
        let options = {
            method: "POST",
            credentials: "same-origin",
            mode: "cors",
            body: data
        };
        return fetch(`/api/users/uploadResponseToAWS/${jobId}/${userId}`, options)
            .then(response => {
                return response.json();
            })
            .then(parsedResponse => {
                console.log("Done: ", parsedResponse);
                toastr.success("Your response has been successfully uploaded.");

            })
            .catch(error => {
                console.log("Error: ", error);
            });
    };
}

export function uploadToAWS(file, jobId, employerId) {
    return function (dispatch) {
        let data = new FormData();
        //the first argument will be the field name
        //that multer is looking for
        data.append("newVideo", file);
        let options = {
            method: "POST",
            credentials: "same-origin",
            mode: "cors",
            body: data
        };
        return fetch(`/api/users/uploadQuestionToAWS/${jobId}/${employerId}`, options)
            .then(response => {
                return response.json();
            })
            .then(parsedResponse => {
                console.log("Done: ", parsedResponse);
                toastr.success("Your video has been uploaded successfully");
                dispatch(JobListActions.dispatchCurrentEmployerPage(parsedResponse.savedJob));

            })
            .catch(error => {
                console.log("Error: ", error);
            });
    };
}