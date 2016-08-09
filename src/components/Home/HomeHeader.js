"use strict";

import React, {PropTypes} from "react";
import {HomeHeaderWelcome} from "./HomeHeaderWelcome";
import {LogInForm} from "../common/LogInForm";

export const HomeHeader = ({activeUser, updateLoginForm, signIn, signInState}) => {
    let headerContent;
    if (!signInState || activeUser) headerContent = <HomeHeaderWelcome/>;
    if (signInState && !activeUser) headerContent = (
        <LogInForm updateLoginForm={updateLoginForm} signIn={signIn}/>
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
    updateLoginForm: PropTypes.func
};