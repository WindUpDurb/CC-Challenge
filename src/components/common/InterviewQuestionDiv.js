"use strict";

import React, {PropTypes} from "react";

export const InterviewQuestionDiv = ({questionNumber, respondToQuestion, questionId,answered}) => {
    let responded, videoID;
    let grabAndSetVideo = () => respondToQuestion(videoID);
    if (answered) responded = <img src="/statics/checked.png"/>;
    if (questionId) videoID = questionId;
    return (
        <div style={{backgroundColor: "white"}}  className="well">
            {responded}
            <div className="text-center">
                <span>Question {questionNumber}</span>
                <label  onClick={grabAndSetVideo} className="cultureFitQues"><span>Watch and Respond</span></label>
            </div>
        </div>
    );
};

InterviewQuestionDiv.propTypes = {
    questionNumber: PropTypes.number,
    answered: PropTypes.bool,
    questionId: PropTypes.string,
    respondToQuestion: PropTypes.func
};