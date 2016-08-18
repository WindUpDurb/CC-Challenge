"use strict";

import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {NavbarPresentation} from "../common/NavbarPresentation";
import {EmployerInterface} from "./EmployerInterface";
import UploadVideoComponent from "../common/UploadVideoComponent";
import * as UserActions from "../../actions/UserActions";
import * as JobListActions from "../../actions/JobListActions";
import * as WebcamAndVideoActions from "../../actions/WebcamAndVideoActions";

class UploadVideoPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };
        
        this.requestCamPermissionAndOpen = this.requestCamPermissionAndOpen.bind(this);
        this.fetchVideoLink = this.fetchVideoLink.bind(this);
        this.playVideo = this.playVideo.bind(this);
        this.clearVideoLinkState = this.clearVideoLinkState.bind(this);

    }

    componentWillMount() {
        this.props.JobListActions.fetchJobData(this.props.jobId);
    }

    requestCamPermissionAndOpen() {
        this.props.WebcamAndVideoActions.requestWebcamPermissionAndOpen();
    }
    
    playVideo() {
        let video = document.querySelector("#videoElement");
        video.play();
    }
    
    fetchVideoLink(linkId) {
        this.props.WebcamAndVideoActions.fetchVideoLink(linkId);
    }
    
    clearVideoLinkState() {
        this.props.WebcamAndVideoActions.clearVideoLinkState();
    }



    render() {
        let showSection;
        if (this.props.employer) showSection = (
            <EmployerInterface requestWebcamPermission={this.requestCamPermissionAndOpen}
                               fetchVideoLink={this.fetchVideoLink} positionData={this.props.jobData}
                               retrievedLink={this.props.retrievedLink} playVideo={this.playVideo}
                               clearVideoLinkState={this.clearVideoLinkState}/>
        );
        if (this.props.employer && this.props.openStream) showSection = (
            <UploadVideoComponent jobId={this.props.jobId} 
                                  employerId={this.props.employer && this.props.activeUser._id}/>
        );
        return (
            <div>
                <NavbarPresentation
                    employer={this.props.employer}
                    signOut={this.signOut}
                    activeUser={this.props.activeUserBool}/>
                <div className="uploadVideoBackground container-fluid">
                    {showSection}
                </div>
            </div>
        );
    }
}

UploadVideoPage.propTypes = {
    UserActions: PropTypes.object,
    openStream: PropTypes.object,
    WebcamAndVideoActions: PropTypes.object,
    JobListActions: PropTypes.object,
    activeUserBool: PropTypes.bool,
    employer: PropTypes.bool,
    activeUser: PropTypes.object,
    jobData: PropTypes.object,
    retrievedLink: PropTypes.string,
    jobId: PropTypes.string
};

function mapStateToProps(state, ownProps) {
    let activeUser, jobData, openStream, retrievedLink;
    if (state.activeUser) activeUser = state.activeUser;
    if (state.webcamAndVideo && state.webcamAndVideo.fetchedLink) retrievedLink = state.webcamAndVideo.fetchedLink;
    if (state.jobListings && state.jobListings.currentPositionData) jobData = state.jobListings.currentPositionData;
    if (state.webcamAndVideo && state.webcamAndVideo.openStream) openStream = state.webcamAndVideo.openStream;
    return {
        activeUserBool: !!state.activeUser,
        employer: !!state.activeUser && !!state.activeUser.employer,
        activeUser,
        jobData,
        openStream,
        retrievedLink,
        jobId: ownProps.routeParams.positionId
    };
}

function mapDispatchToProps(dispatch) {
    return {
        UserActions: bindActionCreators(UserActions, dispatch),
        WebcamAndVideoActions: bindActionCreators(WebcamAndVideoActions, dispatch),
        JobListActions: bindActionCreators(JobListActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadVideoPage);