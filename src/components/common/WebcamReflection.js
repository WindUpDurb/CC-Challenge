"use strict";

import React, {PropTypes} from "react";

export const WebcamReflection = () => {
    
    return (
        <div className="container-fluid">
            <div id="webcamContainer">
                <video autoPlay="true" id="videoElement">

                </video>
            </div>
        </div>
    );
};

WebcamReflection.propTypes = {
    
};