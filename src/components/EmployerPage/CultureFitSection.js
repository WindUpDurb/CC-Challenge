"use strict";

import React, {PropTypes} from "react";
import {InterviewQuestionDiv} from "../common/InterviewQuestionDiv";
import {NonEmployerCultureFit} from "./NonEmployerCultureFit";
import {EmployerCultureFit} from "./EmployerCultureFit";

export const CultureFitSection = ({respondToQuestion, addNewVideo, employer, videoResponse, interviewQuestion}) => {

    let preliminaryScreen;
    if (!employer) preliminaryScreen = <NonEmployerCultureFit respondToQuestion={respondToQuestion} interviewQuestions={interviewQuestion}/>;
    if (employer) preliminaryScreen = <EmployerCultureFit videoResponse={videoResponse} addNewVideo={addNewVideo} respondToQuestion={respondToQuestion} interviewQuestion={interviewQuestion}/>;
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
          {preliminaryScreen}

      </div>
    );

};

CultureFitSection.propTypes = {
    videoResponse: PropTypes.string,
    interviewQuestion: PropTypes.string,
    respondToQuestion: PropTypes.func,
    addNewVideo: PropTypes.func,
    employer: PropTypes.bool
};