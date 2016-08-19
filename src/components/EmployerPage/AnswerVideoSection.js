"use strict";

import React, {PropTypes} from "react";
import UploadVideoComponent from "../common/UploadVideoComponent";

export const AnswerVideoSection = ({beginQuestion, streamObject, watched, respond,
    watchQuestion, initiateResponse, currentSection, fetchedLink, userId, jobId}) => {
    let begin = () => beginQuestion(fetchedLink);
    let button;
    if (currentSection === "response") button = <button onClick={watchQuestion} className="btn btn-lg">Watch Question</button>;
    if (currentSection === "response" && watched) button = <button onClick={initiateResponse} className="btn btn-lg">Respond to Question</button>;
    if (currentSection === "response" && !streamObject) {
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
                <div className="row">
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
                        <h3>Video Screening Response</h3>
                    </div>
                </div>
                <div className="text-center">
                    <h3>For Question 1</h3>
                </div>
                <UploadVideoComponent userId={userId} jobId={jobId} />
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
                    <h4>To Simulate a live screening, you will only be able to answer this question once</h4>
                    <h4>Please ensure you are in a well-lit room without sound pollution</h4>
                    <h4>For this question, Dr. John Doe has requested:</h4>
                    <div style={{width: "80%", backgroundColor: "white", marginTop: "2%"}} className="minimalPadding well">
                        <h5>That you answers truthfully. I look forward to our future, live discussions following this screening</h5>
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
    initiateResponse: PropTypes.func,
    currentSection: PropTypes.string,
    fetchedLink: PropTypes.string,
    jobId: PropTypes.string,
    userId: PropTypes.string,
    respond: PropTypes.bool,
    watched: PropTypes.bool,
    streamObject: PropTypes.object
};