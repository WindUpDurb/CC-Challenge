"use strict";

import React, {PropTypes} from "react";

export const ReplayVideo = ({source}) => {
    return (
        <div>
            <video autoPlay="true" id="videoElement">
                <source src={source} type="video/webm"/>
            </video>
        </div>
       
    );
};

ReplayVideo.propTypes = {
    source: PropTypes.string
};