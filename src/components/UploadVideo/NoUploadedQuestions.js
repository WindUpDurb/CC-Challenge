"use strict";

import React, {PropTypes} from "react";

export const NoUploadedQuestions = ({requestWebcamPermission}) => {
    
    return (
        <div>
            <div className="text-center">
                <h3>You have not uploaded any interview questions</h3>
                <h4>It's not necessary, but advantages are:</h4>
            </div>
            <h5>Filter out less interested candidates</h5>
            <h6>Candidates who respond show greater interest and commitment</h6>
            <h5>Better screen candidates</h5>
            <h6>Decorum and professionalism can be better gauged through their responses</h6>
            <h5>Add a more personable introduction to your </h5>
            <h6>A better first impression cements an applicant's interest</h6>
            <br/><br/>
            <div className="text-center">
                <button type="button" onClick={requestWebcamPermission} className="btn btn-lg">Upload Question</button>
            </div>
        </div>
    );
};

NoUploadedQuestions.propTypes = {
    requestWebcamPermission: PropTypes.func
};