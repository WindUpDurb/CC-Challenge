"use strict";

import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {NavbarPresentation} from "../common/NavbarPresentation";
import {EmployerPagePresentation} from "./EmployerPagePresentation";
import {CultureFitSection} from "./CultureFitSection";
import {AnswerVideoSection} from "./AnswerVideoSection";
import * as JobListActions from "../../actions/JobListActions";
import * as UserActions from "../../actions/UserActions";
import * as WebcamAndVideoActions from "../../actions/WebcamAndVideoActions";
import {bindActionCreators} from "redux";


class EmployerPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSection: "details",
            watched: false
        };

        this.changeSection = this.changeSection.bind(this);
        this.respondToQuestion = this.respondToQuestion.bind(this);
        this.beginQuestion = this.beginQuestion.bind(this);
        this.watchQuestion = this.watchQuestion.bind(this);
        this.initiateResponse = this.initiateResponse.bind(this);
    }

    componentWillMount() {
        this.props.JobListActions.hydrateEmployerPage(this.props.employerId);
    }

    changeSection(event) {
        this.setState({currentSection: event.target.name});
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

    render() {
        let currentSection;
        if (this.state.currentSection === "details") currentSection = <EmployerPagePresentation />;
        if (this.state.currentSection === "cultureFit") currentSection = (
            <CultureFitSection respondToQuestion={this.respondToQuestion} interviewQuestion={this.props.interviewQuestion} />
        );
        if (this.props.videoQuestion) currentSection = (
            <AnswerVideoSection beginQuestion={this.beginQuestion} fetchedLink={this.props.videoQuestion}
                                currentSection={this.state.currentSection} videoLink={this.state.videoLink}
                                watchQuestion={this.watchQuestion} watched={this.state.watched}
                                initiateResponse={this.initiateResponse} streamObject={this.props.streamObject}/>
        );
        return (
            <div>
                <NavbarPresentation/>
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
    employerId: PropTypes.string.isRequired,
    videoQuestion: PropTypes.string,
    JobListActions: PropTypes.object.isRequired,
    WebcamAndVideoActions: PropTypes.object.isRequired,
    UserActions: PropTypes.object.isRequired,
    currentEmployerPage: PropTypes.object,
    streamObject: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    let currentEmployerPage, interviewQuestion, videoQuestion, streamObject;
    if (state.webcamAndVideo && state.webcamAndVideo.openStream) streamObject = state.webcamAndVideo.openStream;
    if (state.webcamAndVideo && state.webcamAndVideo.fetchedLink) videoQuestion = state.webcamAndVideo.fetchedLink;
    if (state.jobListings && state.jobListings.currentEmployerPage) currentEmployerPage = state.jobListings.currentEmployerPage;
    if (currentEmployerPage && currentEmployerPage.videoQuestions.length) interviewQuestion = [...currentEmployerPage.videoQuestions];
    return {
        employerId: ownProps.params.employer,
        currentEmployerPage,
        interviewQuestion,
        videoQuestion,
        streamObject
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