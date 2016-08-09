"use strict";

import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {HomeHeader} from "./HomeHeader";
import {bindActionCreators} from "redux";
import * as UserActions from "../../actions/UserActions";
import {NavbarPresentation} from "../common/NavbarPresentation";

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            signInState: false,
            signInForm: {}
        };
        this.toggleSignIn = this.toggleSignIn.bind(this);
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
        this.updateLoginForm = this.updateLoginForm.bind(this);
    }

    updateLoginForm(event) {
        let field = event.target.name;
        let signInForm = Object.assign({}, this.state.signInForm);
        signInForm[field] = event.target.value;
        return this.setState({signInForm});
    }

    signIn() {
        this.props.UserActions.submitSignInForm(this.state.signInForm);
    }

    signOut() {
        this.props.UserActions.signOut();
    }

    toggleSignIn() {
        this.setState({signInState: !this.state.signInState});
    }

    render() {
        return (
            <div>
                <NavbarPresentation
                    signOut={this.signOut}
                    activeUser={this.props.activeUser}
                    toggleSignIn={this.toggleSignIn}/>
                <HomeHeader
                    activeUser={this.props.activeUser}
                    updateLoginForm={this.updateLoginForm}
                    signIn={this.signIn}
                    signInState={this.state.signInState}/>
            </div>
        );
    }
}

HomePage.propTypes = {
    UserActions: PropTypes.object,
    activeUser: PropTypes.bool
};

function mapDispatchToProps(dispatch) {
    return {
        UserActions: bindActionCreators(UserActions, dispatch)
    };
}

function mapStateToProps (state, ownProps) {
    return {
        activeUser: !!state.activeUser
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);