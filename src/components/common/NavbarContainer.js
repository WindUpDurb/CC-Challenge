"use strict";

import React, {PropTypes} from "react";
import {NavbarPresentation} from "./NavbarPresentation";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

class NavBarContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropDown: true
        };
    }
    
    toggleSignIn() {
        console.log("connected")
    }

    render() {
        return (
            <NavbarPresentation 
                signIn={this.toggleSignIn}
                dropDown={this.state.dropDown}/>
        );
    }
}

NavBarContainer.propTypes = {

};

function mapStateToProps(state, ownProps) {
    return {

    };
}

export default connect(mapStateToProps)(NavBarContainer);