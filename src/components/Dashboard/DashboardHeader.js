"use strict";

import React, {PropTypes} from "react";
import {ProfileCard} from "../common/ProfileCard";

export const DashboardHeader = () => {
    
    return (
        <div id="dashboardHeader">
            <div className="container">
                <div id="profileCardRow" className="row">
                    <div className="well col-md-offset-3 col-md-4">
                        <ProfileCard/>
                    </div>
                </div>
            </div>
        </div>
    );
};

DashboardHeader.propTypes = {
    
};