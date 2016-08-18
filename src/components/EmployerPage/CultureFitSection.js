"use strict";

import React, {PropTypes} from "react";
import {InterviewQuestionDiv} from "../common/InterviewQuestionDiv";

export const CultureFitSection = ({interviewQuestion}) => {

    let question;

    if (interviewQuestion) question = <InterviewQuestionDiv questionNumber={1}/>

    return (
      <div className="container">
          <div className="row">
              <div className="lightGreyBB col-md-10">
                  <h3>Culture Fit</h3>
              </div>
          </div>
          <div style={{paddingTop: "2%"}} className="row">
              <div style={{backgroundColor: "white"}} className="col-md-3 well text-center">
                  <span>Is this practice environment more serious, or light-hearted?</span>
                  <label className="cultureFitAns">Somewhere in the middle</label>
              </div>
              <div style={{backgroundColor: "white"}} className="col-md-3 col-md-offset-1 well text-center">
                  <span>Will you be collaborating with a team, or working independently?</span>
                  <label className="cultureFitAns">Collaborating</label>
              </div>
              <div style={{backgroundColor: "white"}} className="col-md-3 col-md-offset-1 well text-center">
                  <span>Will you be making decisions, or receiving direction?</span>
                  <label className="cultureFitAns">Receiving Directions</label>
              </div>
          </div>
          <div style={{paddingTop: "2%"}} className="row">
              <div style={{backgroundColor: "white"}} className="col-md-3 well text-center">
                  <span>Does this practice have a casual dress code, or formal/clinical?</span>
                  <label className="cultureFitAns">Somewhere in the middle</label>
              </div>
          </div>
          <div style={{paddingTop: "3%"}} className="row">
              <div className="lightGreyBB col-md-10">
                  <h3>Preliminary Video Screening</h3>
              </div>
          </div>
          <div style={{paddingTop: "2%"}}  className="row text-center">
              <h3>Dr. John Doe has provided a preliminary video screening</h3>
          </div>
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

CultureFitSection.propTypes = {
    interviewQuestion: PropTypes.array
};