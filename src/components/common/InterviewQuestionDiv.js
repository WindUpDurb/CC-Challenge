"use strict";

import React, {PropTypes} from "react";

export const InterviewQuestionDiv = ({questionNumber, employer, respondToQuestion, questionId, videoResponse, answered}) => {
    let responded, videoID, response;
    let grabAndSetVideo = () => respondToQuestion(videoID);
    let grabAndSetVideoReview = () => respondToQuestion(videoResponse);
    if (answered) responded = <img src="/statics/checked.png"/>;
    if (questionId) videoID = questionId;
    if (videoResponse) response = <img style={{cursor: "pointer"}} onClick={grabAndSetVideoReview} src="/statics/envelope.png"/>;
    if (employer) {
        return (
            <div style={{backgroundColor: "white"}}  className="well">
                {response}
                <div className="text-center">
                    <span>Question {questionNumber}</span>
                    <label  onClick={grabAndSetVideo} className="cultureFitQues"><span>Review and Edit</span></label>
                    <br/>
                    <span>
                        <img src="/statics/eye.png"/>7
                    </span>
                    <span>
                        <img src="/statics/paper-plane.png"/> 5
                    </span>
                </div>
            </div>
        );
    } else {
        return (
            <div style={{backgroundColor: "white"}}  className="well">
                {responded}
                <div className="text-center">
                    <span>Question {questionNumber}</span>
                    <label  onClick={grabAndSetVideo} className="cultureFitQues"><span>Watch and Respond</span></label>
                </div>
            </div>
        );
    }

};

InterviewQuestionDiv.propTypes = {
    questionNumber: PropTypes.number,
    employer: PropTypes.bool,
    answered: PropTypes.bool,
    videoResponse: PropTypes.string,
    questionId: PropTypes.string,
    respondToQuestion: PropTypes.func
};