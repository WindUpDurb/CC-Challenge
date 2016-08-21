"use strict";

import React, {PropTypes} from "react";
import {daysFromToday} from "../../actions/functionTools";

export const MatchedJob = ({job}) => {
    let image, postingTitle, location, matchScore, applicants, daysFromNow;
    if (job && job.image) image = job.image;
    if (job && job.job_title) postingTitle = job.job_title;
    if (postingTitle && job.contract_type === "PT") postingTitle = `${postingTitle} - Part Time`;
    if (postingTitle && job.contract_type === "FT") postingTitle = `${postingTitle} - Full Time`;
    if (job && job.organization) location = job.organization;
    if (location && job.location) location = `${location} in ${job.location}`;
    if (job && job.score && job.score >= 90) matchScore = (
        <span className="matchScore text-success bg-success roundedCorners">{`${job.score}% Match`}</span>
    );
    if (job && job.score && job.score < 90) matchScore = (
        <span className="matchScore text-info bg-info roundedCorners">{`${job.score}% Match`}</span>
    );
    if (job && job.applicants) applicants = `${job.applicants}+ Applicants`;
    if (job && job.posted_date) daysFromNow = `Posted ${daysFromToday(job.posted_date)}`;

    return (
        <div className="row jobListingRow card lightGreyBB">
            <div className="col-sm-3 col-md-2">
                <img className="img-responsive img-rounded" src={`/statics/${image}`}/>
            </div>
            <div className="col-sm-9 col-md-8">
                <b className="text-info">{postingTitle}</b>
                <br/>
                <span>{location}</span>
                <br/>
                {matchScore}
                <span className="bg-plain roundedCorners">{applicants}</span>
                <span className="bg-plain roundedCorners">{daysFromNow}</span>
            </div>
        </div>
    );
};

MatchedJob.propTypes = {
    job: PropTypes.object
};