"use strict";

import React, {PropTypes} from "react";

export const InterviewQuestionDiv = ({questionNumber, answered}) => {
    let responded;
    if (answered) responded = <img src="/statics/checked.png"/>;
    return (
        <div style={{backgroundColor: "white"}}  className="well">
            {responded}
            <div className="text-center">
                <span>Question {questionNumber}</span>
                <label className="cultureFitQues"><span>Watch and Respond</span></label>
            </div>
        </div>
    );
};

InterviewQuestionDiv.propTypes = {
    questionNumber: PropTypes.number,
    answered: PropTypes.bool
};