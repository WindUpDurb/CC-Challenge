"use strict";

import React, {PropTypes} from "react";
import UploadVideoComponent from "../common/UploadVideoComponent";

export const AnswerVideoSection = ({beginQuestion, clearLocalState, streamObject, watched,
    watchQuestion, initiateResponse, currentSection, fetchedLink, userId, jobId}) => {
    let begin = () => beginQuestion(fetchedLink);
    let button;
    if (currentSection === "response") button = (
       <div>
           <div className="text-center">
               <label style={{width: "15%"}}  onClick={watchQuestion} className="cultureFitQues"><span>Watch Question</span></label>
           </div>
       </div>
    );
    if (currentSection === "response" && watched) button = (
        <div>
            <div className="text-center">
                <label style={{width: "20%"}}  onClick={initiateResponse} className="cultureFitQues"><span>Respond to Question</span></label>
            </div>
        </div>
    );
    if (currentSection === "response" && !streamObject) {
        return (
            <div className="container">
                <div className="row">
                    <div className="lightGreyBB col-md-10">
                        <h3>Video Screen Question 1</h3>
                    </div>
                </div>
                <div style={{paddingTop: "3%"}} className="row">
                    <div className="col-md-6 col-md-offset-2">
                        <video id="watchQuestion" src={fetchedLink}/>
                    </div>
                </div>
                <div className="row text-center">
                    {button}
                </div>
            </div>
        );
    } else if (currentSection === "response" && watched && streamObject) {
        return (
            <div className="container">
                <div className="row">
                    <div className="lightGreyBB col-md-10">
                        <h3>Video Response to Question 1</h3>
                    </div>
                </div>
                <UploadVideoComponent clearLocalState={clearLocalState} streamObject={streamObject} userId={userId} jobId={jobId} />
            </div>
        );
    } else {
        return (
            <div className="container">
                <div className="row">
                    <div className="lightGreyBB col-md-10">
                        <h3>Video Screening Response</h3>
                    </div>
                </div>
                <div className="text-center">
                    <h3>For Question 1</h3>
                </div>
                <div className="minimalPadding">
                    <img style={{marginRight: "1%"}} src="/statics/speech-bubble.png"/>
                    <span className="encouragementText">To Simulate a live screening, you will only be able to answer this question once</span>
                    <br/><br/>
                    <img style={{marginRight: "1%"}} src="/statics/speech-bubble.png"/>
                    <span className="encouragementText">Please ensure you are in a well-lit room without sound pollution</span>
                    <br/><br/>
                    <img style={{marginRight: "1%"}} src="/statics/speech-bubble.png"/>
                    <span className="encouragementText">For this question, Dr. John Doe has requested:</span>
                    <div style={{width: "80%", backgroundColor: "white", marginTop: "2%"}} className="minimalPadding well">
                        <h5>Thank you for your interest in the position. Please answer as truthfully as you can within the allotted thirty seconds. I look forward to our future, live discussions following this screening</h5>
                        <h5>-Dr. John Doe</h5>
                    </div>
                </div>
                <div className="minimalPadding div text-center">
                    <button onClick={begin} className="btn btn-primary">
                        Watch Video Question and Respond
                    </button>
                </div>
            </div>
        );
    }
};

AnswerVideoSection.propTypes = {
    beginQuestion: PropTypes.func,
    watchQuestion: PropTypes.func,
    clearLocalState: PropTypes.func,
    initiateResponse: PropTypes.func,
    currentSection: PropTypes.string,
    fetchedLink: PropTypes.string,
    jobId: PropTypes.string,
    userId: PropTypes.string,
    respond: PropTypes.bool,
    watched: PropTypes.bool,
    streamObject: PropTypes.object
};