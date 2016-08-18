"use strict";

import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {NavbarPresentation} from "../common/NavbarPresentation";
import {EmployerPagePresentation} from "./EmployerPagePresentation";
import {CultureFitSection} from "./CultureFitSection";
import WebcamReflection from "../common/WebcamReflection";
import * as JobListActions from "../../actions/JobListActions";
import * as UserActions from "../../actions/UserActions";
import {bindActionCreators} from "redux";


class EmployerPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSection: "details"
        };

        this.changeSection = this.changeSection.bind(this);
    }

    componentWillMount() {
        this.props.JobListActions.hydrateEmployerPage(this.props.employerId);
    }

    changeSection(event) {
        this.setState({currentSection: event.target.name});
    }



    render() {
        let currentSection;
        if (this.state.currentSection === "details") currentSection = <EmployerPagePresentation />;
        if (this.state.currentSection === "cultureFit") currentSection = <CultureFitSection interviewQuestion={this.props.interviewQuestion} />;
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
    JobListActions: PropTypes.object.isRequired,
    UserActions: PropTypes.object.isRequired,
    currentEmployerPage: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    let currentEmployerPage, interviewQuestion;
    if (state.jobListings && state.jobListings.currentEmployerPage) currentEmployerPage = state.jobListings.currentEmployerPage;
    if (currentEmployerPage && currentEmployerPage.videoQuestions.length) interviewQuestion = [...currentEmployerPage.videoQuestions];
    return {
        employerId: ownProps.params.employer,
        currentEmployerPage,
        interviewQuestion
    };
}

function mapDispatchToProps(dispatch) {
    return {
        JobListActions: bindActionCreators(JobListActions, dispatch),
        UserActions: bindActionCreators(UserActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployerPage);