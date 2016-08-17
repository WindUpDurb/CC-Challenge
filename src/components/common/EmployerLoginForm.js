"use strict";

import React, {PropTypes} from "react";

export const EmployerLoginForm = ({signIn, toggleUserLogin,updateLoginForm}) => {
    let employerLogin = () => signIn("employer");
    return (
        <div id="loginDiv" className="row">
            <div className="well col-sm-5 col-sm-offset-1 col-md-5 col-md-offset-1">
                <div className="row">
                    <div className="col-sm-10 col-sm-offset-1">
                        <div id="loginText" className="text-center">
                            <h3>Employer Login</h3>
                            <h6 className="alternateLoginText" onClick={toggleUserLogin}>Click here for User Login</h6>
                        </div>
                        <div className="input-group input-group-lg">
                            <span className="input-group-addon" id="sizing-addon1">
                                <img src="/statics/mail.png" />
                            </span>
                            <input
                                onChange={updateLoginForm}
                                name="email"
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                aria-describedby="sizing-addon1"/>
                        </div>
                        <br/>
                        <div className="input-group input-group-lg">
                            <span className="input-group-addon" id="sizing-addon1">
                                <img src="/statics/key.png" />
                            </span>
                            <input
                                onChange={updateLoginForm}
                                name="password"
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                aria-describedby="sizing-addon1"/>
                        </div>
                        <div id="loginButtonDiv" className="text-center">
                            <button type="button" onClick={employerLogin} className="btn btn-success btn-lg">Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};

EmployerLoginForm.propTypes = {
    signIn: PropTypes.func,
    updateLoginForm: PropTypes.func,
    toggleUserLogin: PropTypes.func
};