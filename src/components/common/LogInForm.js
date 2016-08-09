"use strict";

import React, {PropTypes} from "react";

export const LogInForm = ({signIn, updateLoginForm}) => {

    return (
        <div id="loginDiv" className="row">
            <div className="well col-md-5 col-md-offset-1">
                <div className="row">
                    <div className="col-sm-10 col-sm-offset-1">
                        <div className="input-group input-group-lg">
                            <span className="input-group-addon" id="sizing-addon1">@</span>
                            <input
                                onChange={updateLoginForm}
                                name="email"
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                aria-describedby="sizing-addon1"/>
                        </div>
                        <div className="input-group input-group-lg">
                            <span className="input-group-addon" id="sizing-addon1">@</span>
                            <input
                                onChange={updateLoginForm}
                                name="password"
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                aria-describedby="sizing-addon1"/>
                        </div>
                    </div>
                    <div className="text-center">
                        <button type="button" onClick={signIn} className="btn btn-success btn-lg">Login</button>
                    </div>
                </div>
            </div>
        </div>
    );

};

LogInForm.propTypes = {
    signIn: PropTypes.func,
    updateLoginForm: PropTypes.func
};