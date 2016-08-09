"use strict";

import { combineReducers } from "redux";
import jobListingsReducer from "./jobListingsReducer";
import requestStatusReducer from "./requestsInProgress";
import userReducer from "./userReducer";

const rootReducer = combineReducers({

    jobListings: jobListingsReducer,
    requestsInProgress: requestStatusReducer,
    activeUser: userReducer
});

export default rootReducer;
