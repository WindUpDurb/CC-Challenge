"use strict";

import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {NavbarPresentation} from "../common/NavbarPresentation";
import {DashboardHeader} from "./DashboardHeader";
import {ListedJob} from "../common/ListedJob";
import {JobListingFilter} from "./JobListingFilter";
import {searchThroughJobs} from "../../actions/functionTools";
import * as UserActions from "../../actions/UserActions";
import * as JobListActions from "../../actions/JobListActions";


class DashboardPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filteredJobs: null
        };
        
        this.updateSearchParams = this.updateSearchParams.bind(this);
    }

    componentWillMount() {
        this.props.JobListActions.fetchJobList();
    }
    
    updateSearchParams(event) {
        let jobListingCopy, filteredJobs;
        let searchParams = event.target.value;
        if (this.props.jobListings.length) jobListingCopy = [...this.props.jobListings];
        if (jobListingCopy) {
            filteredJobs = searchThroughJobs(searchParams, jobListingCopy);
            this.setState({filteredJobs});
        }
    }

    render() {
        let jobListings;
        if (!this.state.filteredJobs && this.props.jobListings) jobListings = this.props.jobListings.map((job, index) => {
            return <ListedJob job={job} key={index}/>;
        });
        if (this.state.filteredJobs && this.props.jobListings) jobListings = this.state.filteredJobs.map((job, index) => {
            return <ListedJob job={job} key={index}/>;
        });
        return (
            <div>
                <NavbarPresentation />
                <DashboardHeader />
                <div className="container">
                    <div className="row">
                        <div className="lightGreyBB col-md-8">
                            <span>Your Career Dashboard</span>
                            <span id="dashboardActiveColor" className="dashboardSectionSelect">Jobs</span>
                            <span style={{marginLeft: "5px"}} className="dashboardSectionSelect">Profile</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3">
                            <JobListingFilter 
                                updateSearchParams={this.updateSearchParams}/>
                        </div>
                        <div className="col-md-6">
                            {jobListings}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

DashboardPage.propTypes = {
    JobListActions: PropTypes.object,
    jobListings: PropTypes.array
};

function mapStateToProps(state, ownProps) {
    let jobListings;
    if (state.jobListings) jobListings = [...state.jobListings];
    return {
        jobListings
    };
}

function mapDispatchToProps(dispatch) {
    return {
        JobListActions: bindActionCreators(JobListActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);