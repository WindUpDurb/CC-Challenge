"use strict";

import * as types from "../actions/actionTypes";
import * as initialState from "./initialState";

export default function userReducer(state = initialState.activeUser, action) {

    switch(action.type) {
        case types.ACTIVE_USER_CONFIRMED:
            return (
                Object.assign({}, action.activeUser)
            );
       
        case types.SIGN_OUT: 
            return (
                null
            );
        
        default:
            return state;
    }
}


