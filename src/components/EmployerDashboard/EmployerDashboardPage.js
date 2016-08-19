"use strict";

import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {NavbarPresentation} from "../common/NavbarPresentation";
import {DashboardHeader} from "../Dashboard/DashboardHeader";
import {ListedJob} from "../common/ListedJob";
import * as UserActions from "../../actions/UserActions";
import * as JobListActions from "../../actions/JobListActions";


class EmployerDashboardPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };

        this.signOut = this.signOut.bind(this);
    }

    componentWillMount() {
        this.props.JobListActions.fetchJobList();
    }


    signOut() {
        this.props.UserActions.signOut();
    }


    render() {
        let openPositions;
       if (this.props.openPositions) openPositions = this.props.openPositions.map((item, index) =><ListedJob employer job={item} key={index}/>);
        return (
            <div>
                <NavbarPresentation
                    employer={this.props.employer}
                    signOut={this.signOut}
                    activeUser={this.props.activeUserBool}/>
                <DashboardHeader
                    activeUserData={this.props.activeUser}
                    employer/>
                <div className="container">
                    <div id="dashboardHeadingRow" className="row">
                        <div className="lightGreyBB col-md-9">
                            <span id="dashboardHeading">Your Open Positions Dashboard</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-7 col-md-offset-2">
                            {openPositions}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

EmployerDashboardPage.propTypes = {
    JobListActions: PropTypes.object,
    UserActions: PropTypes.object,
    openPositions: PropTypes.array,
    activeUserBool: PropTypes.bool,
    employer: PropTypes.bool,
    activeUser: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    let activeUser, openPositions;
    if (state.activeUser) activeUser = state.activeUser;
    if (state.jobListings && state.jobListings.currentListings) openPositions = state.jobListings.currentListings;
    return {
        activeUserBool: !!state.activeUser,
        employer: !!state.activeUser && !!state.activeUser.employer,
        activeUser,
        openPositions
    };
}

function mapDispatchToProps(dispatch) {
    return {
        JobListActions: bindActionCreators(JobListActions, dispatch),
        UserActions: bindActionCreators(UserActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployerDashboardPage);