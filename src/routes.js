"use strict";

import React from "react";
import { Route, IndexRedirect } from "react-router";
import App from "./components/App";
import HomePage from "./components/Home/HomePage";
import DashboardPage from "./components/Dashboard/DashboardPage";
import EmployerPage from "./components/EmployerPage/EmployerPage";
import EmployerDashboardPage from "./components/EmployerDashboard/EmployerDashboardPage";
import UploadVideoPage from "./components/UploadVideo/UploadVideoPage";


export const generateRoutes = (store) => {
    return (
        <Route path="/" component={App}>
            <IndexRedirect to="/home"/>
            <Route path="/home" component={HomePage} />
            <Route path="/dashboard" component={DashboardPage} />
            <Route path="/employerDashboard" component={EmployerDashboardPage} />
            <Route path="/employerDashboard/upload/:positionId" component={UploadVideoPage} />
            <Route path="/dashboard/employer/:employer" component={EmployerPage} />
        </Route>
    );

};

