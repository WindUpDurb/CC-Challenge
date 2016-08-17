"use strict";

import React, {PropTypes} from "react";
import {Link} from "react-router";

export const NavbarPresentation = ({toggleSignIn, signOut, activeUser}) => {
    if (!activeUser) {
        return (
            <nav id="nav" className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"/>
                            <span className="icon-bar"/>
                            <span className="icon-bar"/>
                        </button>
                        <Link to="" style={{width: "300px"}} className="navbar-brand" href="#">
                            <img id="navLogo" src="/statics/logo.png"/>
                            <span>Covalent</span><span>Careers</span>
                        </Link>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-right">
                            <li><a className="pointer" onClick={toggleSignIn}>Sign In </a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    } else {
        return (
            <nav id="nav" className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"/>
                            <span className="icon-bar"/>
                            <span className="icon-bar"/>
                        </button>
                        <Link to="home" style={{width: "300px"}} className="navbar-brand" href="#">
                            <img id="navLogo" src="/statics/logo.png"/>
                            <span>Covalent</span><span>Careers</span>
                        </Link>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-right">
                            <li><Link to="dashboard">My Dashboard</Link></li>
                            <li><a className="pointer" onClick={signOut}>Sign Out </a></li>
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