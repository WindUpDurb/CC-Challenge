"use strict";

import React, {PropTypes} from "react";
import UploadVideoComponent from "../common/UploadVideoComponent";

export const EmployerVideoSection = ({newVideo, employerId, jobId, watchQuestion, streamObject, fetchedLink}) => {
    let uploadVideo;
    if (streamObject && newVideo) {
        uploadVideo = <UploadVideoComponent employerId={employerId} jobId={jobId}/>;
    }

    if (!newVideo && fetchedLink) {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="lightGreyBB col-md-10">
                            <h3>Video Review</h3>
                        </div>
                    </div>
                    <div style={{paddingTop: "5%"}} className="row">
                        <div className="col-md-6 col-md-offset-2">
                            <video id="watchQuestion" src={fetchedLink}/>
                        </div>
                    </div>

                        <div style={{paddingTop: "2%"}} className="text-center">
                            <label onClick={watchQuestion} style={{width: "20%"}} className="cultureFitQues"><span>Play</span></label>
                        </div>

                </div>
            </div>
        );
    } else {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="lightGreyBB col-md-10">
                            <h3>Video Screening Response</h3>
                        </div>
                    </div>
                    <div className="text-center">
                        <h3>Upload a New Video</h3>
                    </div>
                    <div className="row">
                        {uploadVideo}
                    </div>
                </div>
            </div>
        );
    }

};

EmployerVideoSection.propTypes = {
    fetchedLink: PropTypes.string,
    employerId: PropTypes.string,
    jobId: PropTypes.string,
    newVideo: PropTypes.bool,
    streamObject: PropTypes.object
};