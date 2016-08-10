"use strict";

import React, {PropTypes} from "react";
import {ProfileCard} from "../common/ProfileCard";

export const DashboardHeader = ({changeSection}) => {
    
    return (
        <div id="dashboardHeader">
            <div className="container">
                <div id="profileCardRow" className="row">
                    <div id="profileCard" className="well col-md-offset-3 col-md-4">
                        <ProfileCard
                            changeSection={changeSection}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

DashboardHeader.propTypes = {
    changeSection: PropTypes.func
};