"use strict";

import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";
import {CheckActiveUser} from "../CustomMiddleware/AuthMiddleware";

export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(thunk, CheckActiveUser,reduxImmutableStateInvariant()), window.devToolsExtension ? window.devToolsExtension () : f => f)
    );
}
