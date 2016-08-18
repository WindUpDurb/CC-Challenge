"use strict";

import * as types from "../actions/actionTypes";
import * as initialState from "./initialState";

export default function webcamAndVideoReducer(state = initialState.webcamAndVideo, action) {

    switch(action.type) {

        case types.STREAM_OBJECT_CREATED:
            return (
                Object.assign({}, state, {openStream: action.streamObject})
            );
        
        default:
            return state;
    }
}


