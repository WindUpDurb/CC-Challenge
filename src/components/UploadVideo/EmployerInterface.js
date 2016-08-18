"use strict";

import React, {PropTypes} from "react";
import {NoUploadedQuestions} from "./NoUploadedQuestions";
import {UploadedQuestions} from "./UploadedQuestions";
import {ReplayVideo} from "../common/ReplayVideo";

export const EmployerInterface = ({positionData, playVideo, clearVideoLinkState, retrievedLink,fetchVideoLink, requestWebcamPermission}) => {
    let videoUploadInterface;
    if (positionData && !positionData.videoQuestions.length) videoUploadInterface = <NoUploadedQuestions requestWebcamPermission={requestWebcamPermission}/>;
    if (positionData && positionData.videoQuestions.length) videoUploadInterface = <UploadedQuestions fetchVideoLink={fetchVideoLink} positionData={positionData}/>;
    if (retrievedLink) videoUploadInterface = <ReplayVideo clearVideoLinkState={clearVideoLinkState} playVideo={playVideo} source={retrievedLink}/>;
    return (
        <div className="container">
            <div style={{paddingTop: "10%"}} className="row">
                <div className="col-md-7 col-md-offset-3 well">
                    {videoUploadInterface}
                </div>
            </div>
        </div>
    );

};

EmployerInterface.propTypes = {
    positionData: PropTypes.object,
    fetchVideoLink: PropTypes.func,
    clearVideoLinkState: PropTypes.func,
    playVideo: PropTypes.func,
    retrievedLink: PropTypes.string,
    requestWebcamPermission: PropTypes.func
};