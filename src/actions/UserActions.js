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