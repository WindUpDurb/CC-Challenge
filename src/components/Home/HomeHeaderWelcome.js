"use strict";

import React, {PropTypes} from "react";

export const HomeHeaderWelcome = () => {
    return (
        <div>
            <div id="hhWelcomeMainDiv" className="row">
                <div className="col-md-8 col-md-offset-1">
                    <h1 id="hhWelcomeMain">Online Job Matching For Eyecare Professionals</h1>
                </div>
            </div>
            <div id="hhWelcomeSubDiv" className="row">
                <div className="col-md-8 col-md-offset-1">
                    <h2 id="hhWelcomeSub">Find out who's looking today</h2>
                </div>
            </div>
            <div id="homeHeaderButtonsDiv" className="row">
                <div className="col-md-8 col-md-offset-1">
                    <button className="btn btn-success btn-lg">I'm a job seeker</button>
                    <button style={{marginLeft: "12px"}} className="btn btn-success btn-lg">I'm an employee</button>
                </div>
            </div>
        </div>
    );
};