"use strict";

import React, {PropTypes} from "react";
import {VideoCard} from "../common/VideoCard";


export const VideoSection = ({showVideo}) => {
    
    return (
        <div>
            <VideoCard
                link="https://www.youtube.com/embed/Rl6aX0RR530"
                showVideo={showVideo}
                title="The Basics of Background Checks for Healthcare Employees"
                image="/statics/videoImage1.png"/>

            <VideoCard

                link="https://www.youtube.com/embed/HNh7NB5vj_U"
                showVideo={showVideo}
                title="How I Landed My First Optometry Job"
                image="/statics/videoImage2.png"/>
        </div>
    );
    
};

VideoSection.propTypes = {
    showVideo: PropTypes.func
};