"use strict";

import React, {PropTypes} from "react";

export const DashboardJobSection = () => {
    
    
};

DashboardJobSection.propTypes = {
    return (
        <div className="row">
            <div className="col-md-3">
                <JobListingFilter
                    updateFilter={this.updateFilter}/>
            </div>
            <div className="col-md-6">
                {noListings || jobListings}
            </div>
        </div>
    );
};