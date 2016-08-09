"use strict";

import * as types from "../actions/actionTypes";
import * as initialState from "./initialState";

export default function jobListingsReducer (state = initialState.jobListings, action) {
    switch(action.type) {
        case types.JOB_LISTINGS_RECEIVED:
            return (
                action.jobListings
            );
        default:
            return state;
    }
}