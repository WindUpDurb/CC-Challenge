"use strict";

import React from "react";
import { Route, IndexRedirect } from "react-router";
import App from "./components/App";
import HomePage from "./components/Home/HomePage";
import DashboardPage from "./components/Dashboard/DashboardPage";
import EmployerPage from "./components/EmployerPage/EmployerPage";

export const generateRoutes = (store) => {
    return (
        <Route path="/" component={App}>
            <IndexRedirect to="/home"/>
            <Route path="/home" component={HomePage} />
            <Route path="/dashboard" component={DashboardPage} />
            <Route path="/dashboard/employer/:employer" component={EmployerPage} />
        </Route>
    );

};

