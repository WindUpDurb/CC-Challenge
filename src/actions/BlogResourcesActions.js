"use strict";

import React, {PropTypes} from "react";
import * as types from "./actionTypes";

export function dispatchBlogResources(resources) {
    return {
        type: types.BLOG_RESOURCES_RECEIVED,
        resources
    };
}

export function fetchBlogResources() {
    return function(dispatch) {
        return fetch("/api/blog")
            .then(response => {
                return response.json();
            })
            .then(parsedResponse =>     {
                dispatch(dispatchBlogResources(parsedResponse));
            })
            .catch(error => {
                console.log("Error: ", error);
            });
    };
}