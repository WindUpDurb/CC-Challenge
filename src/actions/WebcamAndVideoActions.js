"use strict";

import * as types from "./actionTypes";

export function dispatchStreamObject(streamObject) {
    return {
        type: types.STREAM_OBJECT_CREATED,
        streamObject
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