"use strict";

import * as types from "../actions/actionTypes";
import * as initialState from "./initialState";

export default function blogResourcesReducer (state = initialState.blogResources, action) {
    switch(action.type) {
        case types.BLOG_RESOURCES_RECEIVED:
            return (
                action.resources
            );
        default:
            return state;
    }
}