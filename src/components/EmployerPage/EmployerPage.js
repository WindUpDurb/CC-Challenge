"use strict";

import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {NavbarPresentation} from "../common/NavbarPresentation";
import {EmployerPagePresentation} from "./EmployerPagePresentation";
import {CultureFitSection} from "./CultureFitSection";
import {AnswerVideoSection} from "./AnswerVideoSection";
import {EmployerVideoSection} from "./EmployerVideoSection";
import * as JobListActions from "../../actions/JobListActions";
import * as UserActions from "../../actions/UserActions";
import * as WebcamAndVideoActions from "../../actions/WebcamAndVideoActions";
import {bindActionCreators} from "redux";


class EmployerPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSection: "details",
            watched: false,
            newEmployerVideo: false
        };

        this.changeSection = this.changeSection.bind(this);
        this.respondToQuestion = this.respondToQuestion.bind(this);
        this.beginQuestion = this.beginQuestion.bind(this);
        this.watchQuestion = this.watchQuestion.bind(this);
        this.initiateResponse = this.initiateResponse.bind(this);
        this.addNewVideo = this.addNewVideo.bind(this);
        this.signOut = this.signOut.bind(this);

    }

    componentWillMount() {
        this.props.JobListActions.hydrateEmployerPage(this.props.jobId);
    }

    changeSection(event) {
        this.setState({currentSection: event.target.name});
        this.props.WebcamAndVideoActions.clearState();
    }

    respondToQuestion(questionId){
        this.props.WebcamAndVideoActions.fetchVideoLink(questionId);
    }

    beginQuestion(videoLink) {
        this.setState({currentSection: "response"});
    }


    watchQuestion() {
        let video = document.querySelector("#watchQuestion");
        video.addEventListener("ended", () => this.setState({watched: true}));
        video.play();
    }

    initiateResponse() {
        this.props.WebcamAndVideoActions.requestWebcamPermissionAndOpen();
    }

    addNewVideo() {
        this.setState({newEmployerVideo: true});
        this.initiateResponse();
    }

    signOut() {
        this.props.UserActions.signOut();
    }

    render() {
        let currentSection;
        if (this.state.currentSection === "details") currentSection = <EmployerPagePresentation />;
        if (this.state.currentSection === "cultureFit") currentSection = (
            <CultureFitSection respondToQuestion={this.respondToQuestion}
                               employer={this.props.employer} interviewQuestion={this.props.interviewQuestion}
                               addNewVideo={this.addNewVideo} videoResponse={this.props.videoResponse}/>
        );
        if (this.props.videoQuestion && !this.props.employer) currentSection = (
            <AnswerVideoSection beginQuestion={this.beginQuestion} fetchedLink={this.props.videoQuestion}
                                currentSection={this.state.currentSection} videoLink={this.state.videoLink}
                                watchQuestion={this.watchQuestion} watched={this.state.watched}
                                initiateResponse={this.initiateResponse} streamObject={this.props.streamObject}
                                userId={this.props.userId} jobId={this.props.jobId}/>
        );
        
        if (this.props.videoQuestion && this.props.employer) currentSection = (
            <EmployerVideoSection newVideo={this.state.newEmployerVideo} watchQuestion={this.watchQuestion} fetchedLink={this.props.videoQuestion}/>
        );
        if (this.props.employer && this.state.newEmployerVideo) currentSection = (
            <EmployerVideoSection getPermission={this.initiateResponse} newVideo={this.state.newEmployerVideo}
                                  streamObject={this.props.streamObject} fetchedLink={this.props.videoQuestion}
                                  employerId={this.props.employerId} jobId={this.props.jobId}
                                  watchQuestion={this.watchQuestion}/>
        );
        return (
            <div>
                <NavbarPresentation signOut={this.signOut}
                                    activeUser={this.props.activeUserBool}/>
                <div className="headerStyle"></div>
                <div style={{marginTop: "2%"}} className="container">
                    <div className="row">
                        <div className="col-md-2 tabText">
                            <button className="btn btn-lg btnTab" name="details" onClick={this.changeSection}>Details</button></div>
                        <div className="col-md-2 tabText">
                            <button className="btn btn-lg btnTab" name="cultureFit" onClick={this.changeSection}>Culture Fit</button>
                        </div>
                    </div>
                    <div style={{backgroundColor: "white"}} className="well">
                        {currentSection}
                    </div>
                </div>
            </div>
        );
    }
}

EmployerPage.propTypes = {
    employerId: PropTypes.string,
    videoQuestion: PropTypes.string,
    userId: PropTypes.string,
    interviewQuestion: PropTypes.string,
    jobId: PropTypes.string,
    videoResponse: PropTypes.string,
    JobListActions: PropTypes.object.isRequired,
    WebcamAndVideoActions: PropTypes.object.isRequired,
    UserActions: PropTypes.object.isRequired,
    currentEmployerPage: PropTypes.object,
    streamObject: PropTypes.object,
    activeUserBool: PropTypes.bool,
    employer: PropTypes.bool
};

function mapStateToProps(state, ownProps) {
    let currentEmployerPage, interviewQuestion, videoQuestion,
        streamObject, employerId, userId, employer, videoResponse;
    if (state.activeUser && state.activeUser.employer) employerId = state.activeUser._id;
    if (state.webcamAndVideo && state.webcamAndVideo.openStream) streamObject = state.webcamAndVideo.openStream;
    if (state.webcamAndVideo && state.webcamAndVideo.fetchedLink) videoQuestion = state.webcamAndVideo.fetchedLink;
    if (state.jobListings && state.jobListings.currentEmployerPage) currentEmployerPage = state.jobListings.currentEmployerPage;
    if (currentEmployerPage && currentEmployerPage.videoQuestions) interviewQuestion = currentEmployerPage.videoQuestions;
    if (state.activeUser && state.activeUser._id) userId = state.activeUser._id;
    if (state.activeUser && state.activeUser.employer) employer = true;
    if (currentEmployerPage && currentEmployerPage.videoResponses) videoResponse = currentEmployerPage.videoResponses;
    return {
        employerId,
        currentEmployerPage,
        interviewQuestion,
        videoQuestion,
        streamObject,
        videoResponse,
        userId,
        employer,
        activeUserBool: !!state.activeUser,
        jobId: ownProps.params.employer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        JobListActions: bindActionCreators(JobListActions, dispatch),
        WebcamAndVideoActions: bindActionCreators(WebcamAndVideoActions, dispatch),
        UserActions: bindActionCreators(UserActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployerPage);