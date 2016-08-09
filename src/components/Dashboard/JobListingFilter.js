"use strict";

import React, {PropTypes} from "react";

export const JobListingFilter = ({updateSearchParams}) => {
    return (
        <div id="searchPanel" className="panel panel-default">
            <div className="panel-heading">Filters</div>
            <div className="panel-body">
                <div className="form-group">
                    <label className="col-md-3 control-label">Search</label>

                    <div className="col-md-12">
                        <input
                            onChange={updateSearchParams}
                            type="text"
                            className="form-control"
                            placeholder="Search Listings"/>
                    </div>
                </div>

            </div>
        </div>
    );
};

JobListingFilter.propTypes = {
    updateSearchParams: PropTypes.func
};