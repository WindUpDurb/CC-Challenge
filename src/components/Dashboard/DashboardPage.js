"use strict";

import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {NavbarPresentation} from "../common/NavbarPresentation";
import {DashboardJobSection} from "./DashboardJobSection";
import {DashboardResourcesSection} from "./DashboardResourcesSection";
import {DashboardHeader} from "./DashboardHeader";
import {filterJobs} from "../../actions/functionTools";
import * as UserActions from "../../actions/UserActions";
import * as JobListActions from "../../actions/JobListActions";
import * as BlogResourcesActions from "../../actions/BlogResourcesActions";


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
            showSection: "jobs",
            mediaSection: "blog",
            videoLink: null
        };
        
        this.updateFilter = this.updateFilter.bind(this);
        this.signOut = this.signOut.bind(this);
        this.changeSection = this.changeSection.bind(this);
        this.changeMediaSection = this.changeMediaSection.bind(this);
        this.showVideo = this.showVideo.bind(this);
    }

    componentWillMount() {
        this.props.JobListActions.fetchJobList();
        this.props.BlogResourcesActions.fetchBlogResources();
    }


    signOut() {
        this.props.UserActions.signOut();
    }

    showVideo(link) {
       this.setState({videoLink: link});
    }

    changeSection(event) {
        this.setState({showSection: event.target.name});
        this.setState({videoLink: null});
    }
    
    changeMediaSection(event) {
        this.setState({mediaSection: event.target.name});
        this.setState({videoLink: null});
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
        let currentSection;
        if (this.state.showSection === "jobs") currentSection = (
            <DashboardJobSection
                updateFilter={this.updateFilter}
                jobListings={this.props.jobListings}
                filteredJobs={this.state.filteredJobs}/>
            );
        if (this.state.showSection === "resources") currentSection = (
           <DashboardResourcesSection
               videoLink={this.state.videoLink}
               showVideo={this.showVideo}
                currentMediaSection={this.state.mediaSection}
                changeMediaSection={this.changeMediaSection}
                blogResources={this.props.blogResources}/>
        );

        return (
            <div>
                <NavbarPresentation
                    signOut={this.signOut}
                    activeUser={this.props.activeUser}/>
                <DashboardHeader 
                    changeSection={this.changeSection}/>
                <div className="container">
                    <div id="dashboardHeadingRow" className="row">
                        <div className="lightGreyBB col-md-9">
                            <span id="dashboardHeading">Your Career Dashboard</span>
                        </div>
                    </div>
                    {currentSection}
                </div>
            </div>
        );
    }
}

DashboardPage.propTypes = {
    JobListActions: PropTypes.object,
    BlogResourcesActions: PropTypes.object,
    UserActions: PropTypes.object,
    jobListings: PropTypes.array,
    blogResources: PropTypes.array,
    activeUser: PropTypes.bool
};

function mapStateToProps(state, ownProps) {
    let jobListings, blogResources;
    if (state.jobListings) jobListings = [...state.jobListings];
    if (state.blogResources) blogResources = [...state.blogResources];
    return {
        jobListings,
        blogResources,
        activeUser: !!state.activeUser
    };
}

function mapDispatchToProps(dispatch) {
    return {
        JobListActions: bindActionCreators(JobListActions, dispatch),
        BlogResourcesActions: bindActionCreators(BlogResourcesActions, dispatch),
        UserActions: bindActionCreators(UserActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);