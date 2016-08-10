"use strict";

import React, {PropTypes} from "react";

export const VideoCard = ({link, showVideo, image, title}) => {
    let openVideo = () => showVideo(link);
    return (
        <div style={{marginBottom: "1%"}} onClick={openVideo} className="card">
            <img className="minimalPadding img-responsive" src={image} />
            <br/>
            <div className="minimalPadding">
                <span onClick={openVideo} className="videoTitle">{title}</span>
            </div>
        </div>
    );
};

VideoCard.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
    link: PropTypes.string,
    showVideo: PropTypes.func
};