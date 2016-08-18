"use strict";

import React from "react";

export const EmployerPagePresentation = () => {
  
    return (
        <div>
            <div className="row">
                <div className="col-md-5">
                    <h2>Pros</h2>
                    <div style={{backgroundColor: "white"}}  className="well">
                        <h4>You have all of the required experience.</h4>
                        <h4>Your schedules match up very well.</h4>
                    </div>
                </div>
                <div className="col-md-5 col-md-offset-1">
                    <h2>Cons</h2>
                    <div style={{backgroundColor: "white"}}  className="well">
                        <h4>The practice culture is a good fit, but not great.</h4>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-3">
                    <h2>Position Details</h2>
                    <table className="table table-bordered table-striped table-hover">
                        <tbody>
                        <tr>
                            <td><b>Date Needed:</b></td>
                        </tr>
                        <tr>
                            <td>Immediate Need</td>
                        </tr>
                        <tr>
                            <td><b>Contract Type</b></td>
                        </tr>
                        <tr>
                            <td>Full-Time</td>
                        </tr>
                        <tr>
                            <td><b>Experience Level</b></td>
                        </tr>
                        <tr>
                            <td>3+ Years</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-md-3 col-md-offset-1">
                    <h2>Location</h2>
                </div>
                <div className="col-md-3 col-md-offset-1">
                    <h2>Schedule</h2>
                    <table className="table">
                        <tbody>
                        <tr>
                            <td><b>Monday</b></td>
                            <td>Full Day</td>
                        </tr>
                        <tr>
                            <td><b>Monday</b></td>
                            <td>Full Day</td>
                        </tr>
                        <tr>
                            <td><b>Tuesday</b></td>
                            <td>Full Day</td>
                        </tr>
                        <tr>
                            <td><b>Wednesday</b></td>
                            <td>Full Day</td>
                        </tr>
                        <tr>
                            <td><b>Thursday</b></td>
                            <td>Full Day</td>
                        </tr>
                        <tr>
                            <td><b>Friday</b></td>
                            <td>Full Day</td>
                        </tr>
                        <tr>
                            <td><b>Saturday</b></td>
                            <td>Mornings, Afternoons</td>
                        </tr>
                        <tr>
                            <td><b>Sunday</b></td>
                            <td>Not Needed</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};