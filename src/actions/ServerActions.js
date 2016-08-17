"use strict";

import * as actionTypes from "./actionTypes";

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

export function uploadToAWS(file) {
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
        console.log("Options.body: ", options.body);
        return fetch("/api/users/uploadToAWS", options)
            .then(response => {
                console.log("Response", response);
            })
            .catch(error => {
                console.log("Error: ", error);
            });
    };
}