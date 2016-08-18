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
        console.log("here")
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

// export function beginRecording() {
//     return function (dispatch) {
//         let options = {mimeType: "video/webm"};
//         let recorder = new MediaRecorder(this.state.streamObject, options);
//         recorder.ondataavailable = this.onDataAvailable;
//         recorder.start();
//         this.setState({recordingObject: recorder});
//     };
// }
//
// function onDataAvailable(event) {
//     if(event.data) {
//         let buffer = [];
//         if (this.state.buffer) buffer = [...this.state.buffer];
//         buffer.push(event.data);
//         this.setState({buffer});
//     }
// }