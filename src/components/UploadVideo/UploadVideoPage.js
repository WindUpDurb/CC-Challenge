"use strict";

import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {NavbarPresentation} from "../common/NavbarPresentation";
import * as UserActions from "../../actions/UserActions";


class UploadVideoPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };

    }

    componentWillMount() {
        
    }



    render() {
        return (
            <div>
                <NavbarPresentation
                    employer={this.props.employer}
                    signOut={this.signOut}
                    activeUser={this.props.activeUserBool}/>
                <div className="uploadVideoBackground container-fluid">
                    
                </div>

            </div>
        );
    }
}

UploadVideoPage.propTypes = {
    UserActions: PropTypes.object,
    activeUserBool: PropTypes.bool,
    employer: PropTypes.bool,
    activeUser: PropTypes.object,
    jobId: PropTypes.string
};

function mapStateToProps(state, ownProps) {
    let activeUser;
    if (state.activeUser) activeUser = state.activeUser;
    return {
        activeUserBool: !!state.activeUser,
        employer: !!state.activeUser && !!state.activeUser.employer,
        activeUser,
        jobId: ownProps.routeParams.positionId
    };
}

function mapDispatchToProps(dispatch) {
    return {
        UserActions: bindActionCreators(UserActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadVideoPage);