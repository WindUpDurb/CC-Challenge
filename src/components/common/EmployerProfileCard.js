"use strict";

import React, {PropTypes} from "react";
import {Link} from "react-router";

export const EmployerProfileCard = ({activeUserData}) => {
    return (
        <div className="text-center">
            <img src="https://covalentcareers.com/media/uploads/defaults/profile_page_title.png"/>
            <br/>
            <div className="paddingCard">
                <span id="nameCard">{activeUserData.name}</span>
            </div>
            <div className="text-center paddingCard">
                {activeUserData.email}
            </div>
            <img src="/statics/myLocation.png"/>
            <span style={{marginLeft: "3px"}}>Somewhere, CA, USA</span>
            <div style={{paddingTop: "1%"}} className="text-center">
                <button className="btn whiteText backgroundPink">Open Positions</button>
            </div>
        </div>
    );
};

EmployerProfileCard.propTypes = {
    activeUserData: PropTypes.object
};