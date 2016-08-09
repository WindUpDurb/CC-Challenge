"use strict";

import React, {PropTypes} from "react";

export const NavbarPresentation = ({toggleSignIn, signOut, activeUser}) => {
    if (!activeUser) {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"/>
                            <span className="icon-bar"/>
                            <span className="icon-bar"/>
                        </button>
                        <a className="navbar-brand" href="#">
                            <img id="navLogo" src="/statics/logo.png"/>
                            <span>Covalent</span><span>Careers</span>
                        </a>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-right">
                            <li><a onClick={toggleSignIn}>Sign In </a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    } else {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"/>
                            <span className="icon-bar"/>
                            <span className="icon-bar"/>
                        </button>
                        <a className="navbar-brand" href="#">
                            <img id="navLogo" src="/statics/logo.png"/>
                            <span>Covalent</span><span>Careers</span>
                        </a>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-right">
                            <li><a onClick={signOut}>Sign Out </a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
    
};

NavbarPresentation.propTypes = {
    toggleSignIn: PropTypes.func,
    signOut: PropTypes.func,
    activeUser: PropTypes.bool
};