"use strict";

import * as types from "../actions/actionTypes";
import * as initialState from "./initialState";

export default function webcamAndVideoReducer(state = initialState.webcamAndVideo, action) {

    switch(action.type) {

        case types.STREAM_OBJECT_CREATED:
            return (
                Object.assign({}, state, {openStream: action.streamObject})
            );

        case types.STREAM_CLOSE:
            return (
                Object.assign({}, state, {openStream: null})
            );

        case types.AWS_LINK_RECEIVED:
            return (
                Object.assign({}, state, {fetchedLink: action.link})
            );

        case types.CLEAR_ACTIVE_LINK:
            return (
                Object.assign({}, state, {fetchedLink: null})
            );
        
        default:
            return state;
    }
}


