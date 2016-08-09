"use strict";

import React from "react";
import * as types from "../actions/actionTypes";
import * as UserActions from "../actions/UserActions";

export const CheckActiveUser = store => next => action => {
    if (action.type !== types.CHECK_ACTIVE_USER) return next(action);
    if (sessionStorage.getItem("testLogin")) {
        let parsedUser = JSON.parse(sessionStorage.getItem("testLogin"));
        store.dispatch(UserActions.dispatchSignInSuccess(parsedUser));
        return next(action);
    } else {
        return next(action);
    }
};




