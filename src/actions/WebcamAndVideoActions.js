"use strict";

import * as types from "./actionTypes";

export function dispatchStreamObject(streamObject) {
    return {
        type: types.STREAM_OBJECT_CREATED,
        streamObject
    };
}

export function dispatchCloseStream() {
    return {
        type: types.STREAM_CLOSE
        
    };
}

export function dispatchClearVideoLink() {
    return {
        type: types.CLEAR_ACTIVE_LINK
    };
}

export function dispatchClearState() {
    return {
        type: types.CLEAR_STATE
    };
}

export function dispatchAWSLink(link) {
    return {
        type: types.AWS_LINK_RECEIVED,
        link

    };
}

export function closeStream() {
    return function (dispatch) {
        dispatch(dispatchCloseStream());
    };
}

export function clearVideoLinkState() {
    return function (dispatch) {
        dispatch(dispatchClearVideoLink());
    };
}

export function clearState() {
    return function (dispatch) {
        dispatch(dispatchClearState());
    };
}

export function fetchVideoLink(videoId) {
    return function (dispatch) {
        fetch(`/api/jobs/videoLink/${videoId}`)
            .then(response => {
                return response.json();
            })
            .then(parsedResponse => {
                dispatch(dispatchAWSLink(parsedResponse.awsLink));
            })
            .catch(error => {
                console.log("Error: ", error);
            });
    };
}

export function requestWebcamPermissionAndOpen() {
    return function (dispatch) {
        let constraints = {
            audio: true,
            video: {
                height: {ideal: 720},
                width: {ideal: 1280}
            }
        };
        navigator.mediaDevices.getUserMedia(constraints)
            .then(stream => {
                dispatch(dispatchStreamObject(stream));
            })
            .catch(error => {
                console.log("Error: ", error);
            });
    };
}
