"use strict";

import React, {PropTypes} from "react";

export const DashboardHeader = () => {
    
    return (
        <div id="dashboardHeader">
            <div className="container">
                <div id="profileCardRow" className="row">
                    <div className="well col-md-offset-2 col-md-3">
                        <div className="text-center">
                            <img src="https://covalentcareers.com/media/uploads/defaults/profile_page_title.png"/>
                            <br/>
                            <br/>
                            <span>John Doe</span>
                            <br/>
                            <span>Status: </span>
                            <br/>
                            <span>Somewhere, CA, USA</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

DashboardHeader.propTypes = {
    
};