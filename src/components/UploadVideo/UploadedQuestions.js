"use strict";

import React, {PropTypes} from "react";

export const UploadedQuestions = ({positionData, fetchVideoLink}) => {
    let fetchLink = () => fetchVideoLink(positionData.videoQuestions[0]);
    return (
        <div>
            <div className="text-center">
                <h3>Your Uploaded Questions</h3>
            </div>
            <br/><br/>
            <div className="text-center">
                <h4 onClick={fetchLink} name={fetchLink}>Question 1</h4>
            </div>
        </div>
    );
};

UploadedQuestions.propTypes = {
    positionData: PropTypes.object,
    fetchVideoLink: PropTypes.func
};