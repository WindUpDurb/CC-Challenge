"use strict";

import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {NavbarPresentation} from "../common/NavbarPresentation";
import {DashboardHeader} from "./DashboardHeader";
import * as UserActions from "../../actions/UserActions";
import * as JobListActions from "../../actions/JobListActions";


class DashboardPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.JobListActions.fetchJobList();
    }

    render() {
        return (
            <div>
                <NavbarPresentation />
                <DashboardHeader />
                <div className="container">
                    <div className="row">
                        <div style={{borderBottom: "1px solid #E0E0E0"}} className="col-md-8">
                            <span id="dashboardActiveColor" className="dashboardSectionSelect">Jobs</span>
                            <span style={{marginLeft: "5px"}} className="dashboardSectionSelect">Profile</span>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

DashboardPage.propTypes = {
    JobListActions: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    return {
        
    };
}

function mapDispatchToProps(dispatch) {
    return {
        JobListActions: bindActionCreators(JobListActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);