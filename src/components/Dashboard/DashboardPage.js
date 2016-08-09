"use strict";

import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {NavbarPresentation} from "../common/NavbarPresentation";
import {DashboardHeader} from "./DashboardHeader";
import {ListedJob} from "../common/ListedJob";
import {JobListingFilter} from "./JobListingFilter";
import {NoListings} from "./NoListings";
import {filterJobs} from "../../actions/functionTools";
import * as UserActions from "../../actions/UserActions";
import * as JobListActions from "../../actions/JobListActions";


class DashboardPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filteredJobs: null,
            filter: {
                searchParams: null,
                partTimeOnly: false,
                fullTimeOnly: false
            },
            showSection: "jobs"
        };
        
        this.updateFilter = this.updateFilter.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    componentWillMount() {
        this.props.JobListActions.fetchJobList();
    }


    signOut() {
        this.props.UserActions.signOut();
    }

    updateFilter(event) {
        let jobListingCopy, filteredJobs;
        let searchParams = this.state.filter.searchParams;
        let partTimeOnly = this.state.filter.partTimeOnly;
        let fullTimeOnly = this.state.filter.fullTimeOnly;
        if (event.target.name === "searchParams") searchParams = event.target.value;
        if (event.target.name === "partTimeOnly") partTimeOnly = event.target.checked;
        if (event.target.name === "fullTimeOnly") fullTimeOnly = event.target.checked;
        let toSet = {searchParams, partTimeOnly, fullTimeOnly};
        this.setState({filter: toSet});
        if (this.props.jobListings.length) jobListingCopy = [...this.props.jobListings];
        if (jobListingCopy) {
            filteredJobs = filterJobs(searchParams, partTimeOnly, fullTimeOnly, jobListingCopy);
            this.setState({filteredJobs});
        }
    }

    render() {
        let jobListings, noListings;
        if (!this.state.filteredJobs && this.props.jobListings) jobListings = this.props.jobListings.map((job, index) => {
            return <ListedJob job={job} key={index}/>;
        });
        if (this.state.filteredJobs && this.props.jobListings) jobListings = this.state.filteredJobs.map((job, index) => {
            return <ListedJob job={job} key={index}/>;
        });
        if (jobListings && jobListings.length === 0) noListings = <NoListings/>;
        return (
            <div>
                <NavbarPresentation
                    signOut={this.signOut}
                    activeUser={this.props.activeUser}/>
                <DashboardHeader />
                <div className="container">
                    <div id="dashboardHeadingRow" className="row">
                        <div className="lightGreyBB col-md-9">
                            <span id="dashboardHeading">Your Career Dashboard</span>
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-md-3">
                            <JobListingFilter
                                updateFilter={this.updateFilter}/>
                        </div>
                        <div className="col-md-6">
                            {noListings || jobListings}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

DashboardPage.propTypes = {
    JobListActions: PropTypes.object,
    UserActions: PropTypes.object,
    jobListings: PropTypes.array,
    activeUser: PropTypes.bool
};

function mapStateToProps(state, ownProps) {
    let jobListings;
    if (state.jobListings) jobListings = [...state.jobListings];
    return {
        jobListings,
        activeUser: !!state.activeUser
    };
}

function mapDispatchToProps(dispatch) {
    return {
        JobListActions: bindActionCreators(JobListActions, dispatch),
        UserActions: bindActionCreators(UserActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);