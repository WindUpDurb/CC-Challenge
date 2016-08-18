"use strict";

import React, {PropTypes} from "react";
import {ProfileCard} from "../common/ProfileCard";
import {EmployerProfileCard} from "../common/EmployerProfileCard";

export const DashboardHeader = ({employer, activeUserData, changeSection}) => {
    let profileCard;
    if (!employer) profileCard = <ProfileCard changeSection={changeSection}/>;
    if (employer) profileCard = <EmployerProfileCard activeUserData={activeUserData} />;

    return (
        <div id="dashboardHeader">
            <div className="container">
                <div id="profileCardRow" className="row">
                    <div id="profileCard" className="well col-sm-6 col-sm-offset-2 col-md-offset-3 col-md-4">
                        {profileCard}
                    </div>
                </div>
            </div>
        </div>
    );
};

DashboardHeader.propTypes = {
    changeSection: PropTypes.func,
    activeUserData: PropTypes.object,
    employer: PropTypes.bool
};