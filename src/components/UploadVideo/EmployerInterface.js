"use strict";

import React, {PropTypes} from "react";
import {NoUploadedQuestions} from "./NoUploadedQuestions";
import {UploadedQuestions} from "./UploadedQuestions";

export const EmployerInterface = ({positionData, retrievedLink,fetchVideoLink, requestWebcamPermission}) => {
    let videoUploadInterface;
    if (positionData && !positionData.videoQuestions.length) videoUploadInterface = <NoUploadedQuestions requestWebcamPermission={requestWebcamPermission}/>;
    if (positionData && positionData.videoQuestions.length) videoUploadInterface = <UploadedQuestions fetchVideoLink={fetchVideoLink} positionData={positionData}/>;
    if (retrievedLink) videoUploadInterface = (
        <video autoPlay="true" src={retrievedLink}/>
    );
    return (
        <div className="container">
            <div style={{paddingTop: "10%"}} className="row">
                <div className="col-md-6 col-md-offset-3 well">
                    {videoUploadInterface}
                </div>
            </div>
        </div>
    );

};

EmployerInterface.propTypes = {
    positionData: PropTypes.object,
    fetchVideoLink: PropTypes.func,
    retrievedLink: PropTypes.string,
    requestWebcamPermission: PropTypes.func
};