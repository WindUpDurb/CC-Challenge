"use strict";


export function fetchJobList() {
    return function (dispatch) {
        return fetch("/api/jobs")
            .then(response => {
                return response.json();
            })
            .then(parsedResponse => {
                console.log("Here: ", parsedResponse);
            })
            .catch(error => {
                console.log("Error: ", error);
            });
    };
}