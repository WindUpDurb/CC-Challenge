"use strict";

import React, {PropTypes} from "react";
import {InterviewQuestionDiv} from "../common/InterviewQuestionDiv";

export const NonEmployerCultureFit = ({interviewQuestions, respondToQuestion}) => {
    let question;
    if (interviewQuestions) question = <InterviewQuestionDiv respondToQuestion={respondToQuestion} questionId={interviewQuestions} questionNumber={1}/>
    return (
        <div>
            
            <div className="row">
                <div className="col-md-5">
                    <span>This is an opportunity for you to make an impressionable introduction</span>
                    <br/>
                    <span>Show how interested you are in the position</span>
                    <br/>
                    <span>Succintly </span>
                </div>
            </div>
            <div style={{paddingTop: "2%"}} className="row">
                <div className="col-md-5 col-md-offset-3">
                    <div style={{backgroundColor: "white"}}  className="well">
                        <img src="/statics/checked.png"/>
                        <div className="text-center">
                            <span>Dr. John Doe's Introduction</span>
                            <label className="cultureFitQues"><span className="strikeThrough">Watch and Respond</span></label>
                        </div>
                    </div>
                    {question}
                </div>
            </div>
        </div>
    );
};

NonEmployerCultureFit.propTypes = {
    interviewQuestions: PropTypes.string,
    respondToQuestion:PropTypes.func
};