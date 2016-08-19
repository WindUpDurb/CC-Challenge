"use strict";

import React, {PropTypes} from "react";
import {InterviewQuestionDiv} from "../common/InterviewQuestionDiv";

export const EmployerCultureFit = ({interviewQuestion, addNewVideo, videoResponse, respondToQuestion}) => {
    let question;
    if (interviewQuestion) question = (
        <InterviewQuestionDiv respondToQuestion={respondToQuestion} employer 
                              questionId={interviewQuestion} questionNumber={1}
                              videoResponse={videoResponse}/>
    );
    return (
        <div>
            <div style={{paddingTop: "2%"}}  className="row text-center">
                <h3>Dr. John Doe, here are your video screenings to review</h3>
            </div>
            <div style={{paddingTop: "2%"}} className="row">
                <div className="col-md-5 col-md-offset-3">
                    <div style={{backgroundColor: "white"}}  className="well">
                        <div className="text-center">
                            <span>Dr. John Doe's Introduction</span>
                            <label className="cultureFitQues"><span>Review and Edit</span></label>
                            <br/>
                            <span>
                                <img src="/statics/eye.png"/>10
                            </span>
                            <span>
                                <img src="/statics/paper-plane.png"/> 9
                            </span>
                        </div>
                    </div>
                    {question}
                    <div style={{paddingTop: "2%"}} className="text-center">
                        <label onClick={addNewVideo} className="cultureFitQues"><span>Create a new video</span></label>
                    </div>
                </div>
            </div>
        </div>
    );
};

EmployerCultureFit.propTypes ={
    interviewQuestion: PropTypes.string,
    videoResponse: PropTypes.string,
    addNewVideo: PropTypes.func,
    respondToQuestion: PropTypes.func
};