"use strict";

import React, {PropTypes} from "react";
import {JobListingFilter} from "./JobListingFilter";
import {ListedJob} from "../common/ListedJob";
import {NoListings} from "./NoListings";

export const DashboardJobSection = ({filteredJobs, jobListings, updateFilter}) => {
    let noListings;
    if (!filteredJobs && jobListings) jobListings = jobListings.map((job, index) => {
        return <ListedJob job={job} key={index}/>;
    });
    if (filteredJobs && jobListings) jobListings = filteredJobs.map((job, index) => {
        return <ListedJob job={job} key={index}/>;
    });
    if (jobListings && jobListings.length === 0) noListings = <NoListings/>;
    return (
        <div className="row">
            <div className="col-sm-5 col-md-3">
                <JobListingFilter
                    updateFilter={updateFilter}/>
            </div>
            <div className="col-sm-7 col-md-6">
                {noListings || jobListings}
            </div>
        </div>
    );
};

DashboardJobSection.propTypes = {
    filteredJobs: PropTypes.array,
    jobListings: PropTypes.array,
    updateFilter: PropTypes.func
};