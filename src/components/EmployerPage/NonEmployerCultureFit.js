"use strict";

import React, {PropTypes} from "react";
import {InterviewQuestionDiv} from "../common/InterviewQuestionDiv";

export const NonEmployerCultureFit = ({interviewQuestions, respondToQuestion}) => {
    let question;
    if (interviewQuestions) question = <InterviewQuestionDiv respondToQuestion={respondToQuestion} questionId={interviewQuestions} questionNumber={1}/>
    return (
        <div>
            
            <div style={{paddingTop: "2%"}} className="row">
                <div className="col-md-8">
                    <img style={{marginRight: "1%"}} src="/statics/speech-bubble.png"/>
                    <span className="encouragementText">This is an opportunity for you to make an impressionable introduction</span>
                    <br/><br/>
                    <img style={{marginRight: "1%"}} src="/statics/speech-bubble.png"/>
                    <span className="encouragementText">Show your prospective employer how interested you are in the position</span>
                </div>
            </div>
            <div style={{paddingTop: "3%"}} className="row">
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