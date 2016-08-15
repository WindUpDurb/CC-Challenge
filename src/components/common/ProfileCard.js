"use strict";

import React, {PropTypes} from "react";
import {Link} from "react-router";

export const ProfileCard = ({changeSection}) => {
    return (
        <div className="text-center">
            <img src="https://covalentcareers.com/media/uploads/defaults/profile_page_title.png"/>
            <br/>
            <div className="paddingCard">
                <span id="nameCard">John Doe</span>
            </div>
            <div className="paddingCard">
                <select>
                    <option>Unemployed, looking for a new position</option>
                    <option>Employed, looking for a new position</option>
                    <option>Employed, not looking for a new position</option>
                </select>
            </div>
            <img src="/statics/myLocation.png"/>
            <span style={{marginLeft: "3px"}}>Somewhere, CA, USA</span>
            <div style={{paddingTop: "1%"}} className="text-center">
                <button name="jobs" onClick={changeSection}
                        className="btn whiteText backgroundPink">Jobs</button>
                <button name="resources" onClick={changeSection}
                        style={{marginLeft: "4px"}} className="btn whiteText backgroundBlue">Resources</button>
                <Link to="/">
                    <button style={{marginLeft: "4px"}}
                            className="btn whiteText backgroundPink">Interested in You</button>
                </Link>
            </div>
        </div>
    );
};

ProfileCard.propTypes = {
    changeSection: PropTypes.func
};