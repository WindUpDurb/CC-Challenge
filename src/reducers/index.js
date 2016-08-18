"use strict";

import {combineReducers} from "redux";
import jobListingsReducer from "./jobListingsReducer";
import userReducer from "./userReducer";
import blogResourcesReducer from "./blogResourcesReducer";
import webcamAndVideoReducer from "./webcamAndVideoReducer";

const rootReducer = combineReducers({
    jobListings: jobListingsReducer,
    activeUser: userReducer,
    blogResources: blogResourcesReducer,
    webcamAndVideo: webcamAndVideoReducer
});

export default rootReducer;
