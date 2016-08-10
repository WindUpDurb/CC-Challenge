"use strict";

import React, {PropTypes} from "react";
import {BlogCard} from "../common/BlogCard";
import {DashboardResourcesMediaSelect} from "./DashboardResourcesMediaSelect";
import {VideoSection} from "./VideoSection";
import {YouTubeVideo} from "../common/YouTubeVideo";

export const DashboardResourcesSection = ({videoLink, showVideo, changeMediaSection, currentMediaSection, blogResources}) => {
    let blogCollection, currentSection;
    if (blogResources && blogResources.length > 0) blogCollection = (
        blogResources.map((blog, index) => <BlogCard key={index} blog={blog} />)
    );
    if (!videoLink && currentMediaSection === "blog") currentSection = (
        <div className="col-md-5">
            {blogCollection}
        </div>
    );
    if (!videoLink && currentMediaSection === "videoSelect") currentSection = (
        <div className="col-md-4">
            <VideoSection
                showVideo={showVideo}/>
        </div>
    );
    if (videoLink) currentSection = (
        <div className="col-md-7">
            <YouTubeVideo link={videoLink}/>
        </div>
    );
    return (
        <div className="row">
            <div className="col-md-3">
                <DashboardResourcesMediaSelect changeMediaSection={changeMediaSection}/>
            </div>
            {currentSection}
        </div>
    );
};

DashboardResourcesSection.propTypes = {
    blogResources: PropTypes.array,
    changeMediaSection: PropTypes.func,
    showVideo: PropTypes.func,
    currentMediaSection: PropTypes.string,
    videoLink: PropTypes.string
};