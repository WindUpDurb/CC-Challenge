"use strict";

import React, {PropTypes} from "react";
import {Link} from "react-router";
import {daysFromToday} from "../../actions/functionTools";

export const ListedOpenPosition = ({job}) => {
    let image, postingTitle, organization, jobId;
    if (job && job.jobTitle) postingTitle = job.jobTitle;
    if (job && job.organization) organization = job.organization;
    if (job && job.jobId) jobId = job.jobId;

    return (
        <div className="row jobListingRow card lightGreyBB">
            <div className="col-sm-9 col-md-12">
                <Link to={`/employerDashboard/update/${jobId}`}><b className="text-info">{postingTitle}</b></Link>
                <br/>
                <span>{organization}</span>
                <br/>
                <div className="row">
                    <div className="col-md-5">
                        <button className="btn btn-sm">
                            Update Position
                        </button>
                    </div>
                    <div className="col-md-5">
                        <Link to={`employerDashboard/upload/${jobId}`}>
                            <button type="button" className="uploadInterviewQuestionB btn btn-sm">
                                Upload Video Interview Questions
                            </button>
                        </Link>

                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-offset-7 col-md-5">
                        <span className="bg-plain roundedCorners">10+ Applicants</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

ListedOpenPosition.propTypes = {
    job: PropTypes.object
};