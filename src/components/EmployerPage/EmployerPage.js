"use strict";

import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {NavbarPresentation} from "../common/NavbarPresentation";
import {WebcamReflection} from "../common/WebcamReflection";
import * as JobListActions from "../../actions/JobListActions";
import {bindActionCreators} from "redux";


class EmployerPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.JobListActions.hydrateEmployerPage(this.props.employerId);
    }

    render() {
        return (
            <div>
                <NavbarPresentation/>
                <WebcamReflection />
            </div>
        );
    }
}

EmployerPage.propTypes = {
    employerId: PropTypes.string.isRequired,
    JobListActions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        employerId: ownProps.params.employer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        JobListActions: bindActionCreators(JobListActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployerPage);