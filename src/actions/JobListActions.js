"use strict";

import * as types from "./actionTypes";

export function dispatchJobListings(jobListings) {
    return {
        type: types.JOB_LISTINGS_RECEIVED,
        jobListings
    };
}

export function fetchJobList() {
    return function (dispatch) {
        return fetch("/api/jobs")
            .then(response => {
                return response.json();
            })
            .then(parsedResponse => {
                dispatch(dispatchJobListings(parsedResponse));
            })
            .catch(error => {
                console.log("Error: ", error);
            });
    };
}