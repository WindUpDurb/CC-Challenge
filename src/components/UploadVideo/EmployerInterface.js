"use strict";

import React, {PropTypes} from "react";
import {NoUploadedQuestions} from "./NoUploadedQuestions";

export const EmployerInterface = ({positionData, requestWebcamPermission}) => {
    console.log("Position data: ", positionData)
    let videoUploadInterface;
    if (positionData && !positionData.videoQuestions.length) videoUploadInterface = <NoUploadedQuestions requestWebcamPermission={requestWebcamPermission}/>;
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
    requestWebcamPermission: PropTypes.func
};