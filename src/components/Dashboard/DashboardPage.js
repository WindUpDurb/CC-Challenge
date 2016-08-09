"use strict";

import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as UserActions from "../../actions/UserActions";
import * as JobListActions from "../../actions/JobListActions";


class DashboardPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log(this.props)
        this.props.JobListActions.fetchJobList();
    }

    render() {
        return (
            <div>Stuff</div>
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