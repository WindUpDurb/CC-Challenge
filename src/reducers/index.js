"use strict";

import {combineReducers} from "redux";
import jobListingsReducer from "./jobListingsReducer";
import userReducer from "./userReducer";
import blogResourcesReducer from "./blogResourcesReducer";

const rootReducer = combineReducers({
    jobListings: jobListingsReducer,
    activeUser: userReducer,
    blogResources: blogResourcesReducer
});

export default rootReducer;
