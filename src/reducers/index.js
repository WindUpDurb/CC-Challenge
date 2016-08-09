"use strict";

import { combineReducers } from "redux";
import jobPostsReducer from "./jobPostsReducer";
import requestStatusReducer from "./requestsInProgress";
import userReducer from "./userReducer";

const rootReducer = combineReducers({

    jobPosts: jobPostsReducer,
    requestsInProgress: requestStatusReducer,
    activeUser: userReducer
});

export default rootReducer;
