"use strict";

import React, {PropTypes} from "react";
import {HomeHeaderWelcome} from "./HomeHeaderWelcome";
import {LogInForm} from "../common/LogInForm";
import {EmployerLoginForm} from "../common/EmployerLoginForm";

export const HomeHeader = ({activeUser, updateLoginForm, signIn, toggleUserLogin, toggleEmployerLogin,signInState}) => {
    let headerContent;
    if (!signInState || activeUser) headerContent = <HomeHeaderWelcome/>;
    if (signInState === "user" && !activeUser) headerContent = (
        <LogInForm toggleEmployerLogin={toggleEmployerLogin} updateLoginForm={updateLoginForm} signIn={signIn}/>
    );
    if (signInState === "employer" && !activeUser) headerContent = (
        <EmployerLoginForm toggleUserLogin={toggleUserLogin} updateLoginForm={updateLoginForm} signIn={signIn}/>
    );
    
    
  return (
      <div id="homeHeader" className="container-fluid">
        <header>
            {headerContent}
        </header>
      </div>
  );  
};

HomeHeader.propTypes = {
    signInState: PropTypes.bool,
    activeUser: PropTypes.bool,
    signIn: PropTypes.func,
    toggleEmployerLogin: PropTypes.func,
    updateLoginForm: PropTypes.func
};