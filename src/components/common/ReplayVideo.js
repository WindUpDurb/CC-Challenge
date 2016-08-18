"use strict";

import React, {PropTypes} from "react";

export const ReplayVideo = ({source, clearVideoLinkState, playVideo}) => {
    return (
        <div>
            <div style={{paddingBottom: "1%"}} className="row">
                <div className="col-md-1 col-md-offset-10">
                    <img onClick={clearVideoLinkState} className="closeButton" src="/statics/close.png"/>
                </div>
            </div>
            <video id="videoElement">
                <source src={source} type="video/webm"/>
            </video>
            <div className="text-center">
                <button onClick={playVideo} className="btn btn-lg">Play/Replay</button>
            </div>
        </div>
       
    );
};

ReplayVideo.propTypes = {
    source: PropTypes.string,
    clearVideoLinkState: PropTypes.func,
    playVideo: PropTypes.func
};