"use strict";

import * as types from "./actionTypes";
import {browserHistory} from "react-router";

export function dispatchSignInSuccess(activeUser) {
    return {
        type: types.ACTIVE_USER_CONFIRMED,
        activeUser
    };
}

export function dispatchSignOut() {
    return {
        type: types.SIGN_OUT
    };
}

export function signOut() {
    return function (dispatch) {
        sessionStorage.removeItem("testLogin");
        dispatch(dispatchSignOut());
        browserHistory.push("/");
    };
}

export function requestWebcamPermission() {
    let constraints = {
        audio: true,
        video: {
            height: {ideal: 720},
            width: {ideal: 1280}
        }
    };

    navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => {
            let video = document.querySelector("video");
            video.src = window.URL.createObjectURL(stream);
            video.onloadedmetadata = e => video.play();
            return stream;
        })
        .catch(error => {
            console.log("Error: ", error);
        });
}

export function beginRecording(streamObject) {
    let recorder = new MediaRecorder(streamObject);
    recorder.start();
    recorder.requestData();
    console.log("Recording has started");
    console.log("Recorder: ", recorder);
    return recorder;
}

export function endRecording(recordingObject) {
    recordingObject.stop();
    console.log("Recording end")
}

export function submitSignInForm(signInForm) {
    return function(dispatch) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let options = {
            method: "POST",
            credentials: "same-origin",
            headers: headers,
            mode: "cors",
            cache: "default",
            body: JSON.stringify(signInForm)
        };
        return fetch("/api/users/login", options)
            .then(response => {
                return response.json();
            })
            .then(parsedResponse => {
                if (!parsedResponse.error) {
                    sessionStorage.setItem("testLogin", JSON.stringify(parsedResponse));
                    dispatch(dispatchSignInSuccess(parsedResponse));
                }
            })
            .catch(error => {
                console.log("Error: ", error);
            });
    };
}