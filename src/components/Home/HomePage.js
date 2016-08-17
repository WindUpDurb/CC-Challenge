"use strict";

import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {HomeHeader} from "./HomeHeader";
import {SubHomeHeaderSection} from "./SubHeaderSection";
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
        this.toggleEmployerLogin = this.toggleEmployerLogin.bind(this);
    }

    updateLoginForm(event) {
        let field = event.target.name;
        let signInForm = Object.assign({}, this.state.signInForm);
        signInForm[field] = event.target.value;
        return this.setState({signInForm});
    }

    signIn(userType) {
        if (userType === "user") this.props.UserActions.submitSignInForm(this.state.signInForm);
        if (userType === "employer") this.props.UserActions.submitSignInFormEmployer(this.state.signInForm);
    }

    signOut() {
        this.props.UserActions.signOut();
    }

    toggleSignIn() {
        this.setState({signInState: "user"});
    }

    toggleEmployerLogin() {
        this.setState({signInState: "employer"});
    }

    render() {
        return (
            <div>
                <NavbarPresentation
                    signOut={this.signOut}
                    activeUser={this.props.activeUser}
                    toggleSignIn={this.toggleSignIn}/>
                <HomeHeader
                    toggleUserLogin={this.toggleSignIn}
                    toggleEmployerLogin={this.toggleEmployerLogin}
                    activeUser={this.props.activeUser}
                    updateLoginForm={this.updateLoginForm}
                    signIn={this.signIn}
                    signInState={this.state.signInState}/>
                <SubHomeHeaderSection/>
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