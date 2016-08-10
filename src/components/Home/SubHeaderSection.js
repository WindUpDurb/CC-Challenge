"use strict";

import React from "react";

export const SubHomeHeaderSection = () => {
    
    return (
        <div className="container">
            <div id="homeSubHeaderRow" className="row">
                <div className="col-sm-10 col-md-5">
                    <img className="img-responsive" src="/statics/2-optometry-resumes.png"/>
                </div>
                <div className="col-sm-10 col-md-6 col-md-offset-1">
                    <h1>Find incredible eyecare jobs</h1>
                    <br/>
                    <p>Discover the best optometrist and optical staff opportunities in your area. Take advantage of unique match-making technology that scores each job based on how well it suits what you're looking for!</p>
                    <br/>
                    <ul>
                        <li><b>Free.</b> Optometrist and optician job seeker accounts are 100% free</li>
                        <li><b>Personalized.</b> Match scores show which jobs are the best fit for you</li>
                        <li><b>Fast & easy.</b> Browse hundreds of eyecare jobs and apply with 1 click</li>
                    </ul>
                    <br/>
                    <div>
                        <button className="btn backgroundPink whiteText btn-lg">Create a Free Account</button>
                        <button style={{marginLeft: "5px"}} className="btn backgroundBlue whiteText btn-lg">Learn More</button>
                    </div>
                </div>
            </div>
        </div>
    );
};