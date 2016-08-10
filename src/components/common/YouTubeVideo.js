"use strict";

import React, {PropTypes} from "react";

export const YouTubeVideo = ({link}) => {
    return (
        <iframe width="80%" height="500px"
                src={link}>
        </iframe>
    );
};

YouTubeVideo.propTypes = {
    link: PropTypes.string
};