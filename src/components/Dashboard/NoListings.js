"use strict";

import React, {PropTypes} from "react";

export const NoListings = () => {
    return (
        <div id="noListingsDiv" className="row">
            <div className="col-sm-8 col-md-11 col-md-offset-1">
                <span id="noListingsText">There are no available job listings.</span>
            </div>
        </div>
    );
};