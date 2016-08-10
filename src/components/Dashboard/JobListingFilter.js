"use strict";

import React, {PropTypes} from "react";

export const JobListingFilter = ({updateFilter}) => {
    return (
        <div id="searchPanel" className="panel panel-default">
            <div className="panel-heading">Filters</div>
            <div className="panel-body">
                <div className="form-group">
                    <label className="col-md-3 control-label">Search</label>
                    <div className="col-md-12">
                        <input
                            onChange={updateFilter}
                            name="searchParams"
                            type="text"
                            className="form-control"
                            placeholder="Search Listings"/>
                    </div>
                </div>
                <br/>
                <br/>
                <div id="checkBoxesDiv">
                    <div className="form-group">
                        <label className="col-md-10 control-label">Filter by only:</label>
                        <div className="col-md-10">
                            <div className="togglebutton">
                                <label>
                                    <input
                                        name="fullTimeOnly"
                                        onChange={updateFilter}
                                        type="checkbox"/> Full-Time
                                </label>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className="form-group">
                        <div className="col-md-10">
                            <div className="togglebutton">
                                <label>
                                    <input
                                        name="partTimeOnly"
                                        onChange={updateFilter}
                                        type="checkbox"/> Part-Time
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

JobListingFilter.propTypes = {
    updateFilter: PropTypes.func
};