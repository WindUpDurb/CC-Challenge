"use strict";

import { combineReducers } from "redux";
import jobListingsReducer from "./jobListingsReducer";
import requestStatusReducer from "./requestsInProgress";
import userReducer from "./userReducer";
import blogResourcesReducer from "./blogResourcesReducer";

const rootReducer = combineReducers({
    jobListings: jobListingsReducer,
    requestsInProgress: requestStatusReducer,
    activeUser: userReducer,
    blogResources: blogResourcesReducer
});

export default rootReducer;
