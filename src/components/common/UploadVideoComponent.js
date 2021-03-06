"use strict";

import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {PulsingDot} from "../common/PulsingDot";
import * as UserActions from "../../actions/UserActions";
import * as ServerActions from "../../actions/ServerActions";
import * as WebcamAndVideoActions from "../../actions/WebcamAndVideoActions";

class UploadVideoComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state ={
            recordingObject: null,
            recording: null,
            buffer: null,
            dataUrl: null,
            readerResult: null,
            blobToUpload: null,
            button: "begin"
        };

        this.beginRecording = this.beginRecording.bind(this);
        this.endRecording = this.endRecording.bind(this);
        this.onDataAvailable = this.onDataAvailable.bind(this);
        this.bufferToDataUrl = this.bufferToDataUrl.bind(this);
        this.playFromNewlyRecorded = this.playFromNewlyRecorded.bind(this);
        this.uploadToAWS = this.uploadToAWS.bind(this);
        this.closeStream = this.closeStream.bind(this);
    }


    componentDidMount() {
        let video = document.querySelector("#uploadVideo");
        video.src = window.URL.createObjectURL(this.props.streamingObject);
        video.onloadedmetadata = e => video.play();
    }

    beginRecording() {
        let options = {mimeType: "video/webm"};
        let recorder = new MediaRecorder(this.props.streamingObject, options);
        recorder.ondataavailable = this.onDataAvailable;
        recorder.start();
        this.setState({
            recording: true,
            button: "end",
            recordingObject: recorder
        });
    }

    onDataAvailable(event) {
        if(event.data) {
            let buffer = [];
            if (this.state.buffer) buffer = [...this.state.buffer];
            buffer.push(event.data);
            this.setState({buffer});
        }
    }

    endRecording() {
        let recordingObject = this.state.recordingObject;
        recordingObject.stop();
        this.setState({recording: false, button: "post"});
        //ends the feed below
        recordingObject.stream.getTracks().forEach(function(track) {track.stop();});
        this.bufferToDataUrl(this.state.buffer, (dataUrl, blob) => {
            this.setState({dataUrl});
            this.setState({blobToUpload: blob});
        });
    }

    playFromNewlyRecorded() {
        let video = document.querySelector("video");
        video.src = this.state.dataUrl;
        video.type = "video/webm";
        video.play();
    }

    bufferToDataUrl(buffer, callback) {
        let blob = new Blob(buffer, {
            type: "video/webm"
        });
        let reader = new FileReader();
        reader.onload = function() {
            callback(reader.result, blob);
        };
        reader.readAsDataURL(blob);
    }


    uploadToAWS() {
        if (this.props.employerId) {
            this.props.ServerActions.uploadToAWS(this.state.blobToUpload, this.props.jobId, this.props.employerId);
            this.props.clearLocalState();
        }
        if (this.props.userId) {
            this.props.ServerActions.uploadToAWSUser(this.state.blobToUpload, this.props.jobId, this.props.userId);
            this.props.clearLocalState();
        }
    }

    closeStream() {
        this.props.WebcamAndVideoActions.closeStream();
    }


    render() {
        let button, recording;
        if (this.state.recording) recording = <PulsingDot/>;
        if (this.state.button === "begin") button = <button onClick={this.beginRecording} className="uploadInterviewQuestionB btn btn-lg">Begin Recording</button>;
        if (this.state.button === "end") button = <button onClick={this.endRecording} className="uploadInterviewQuestionB btn btn-lg">End Recording</button>;
        if (this.state.button === "post") button = (
            <div>
                <button onClick={this.playFromNewlyRecorded} className="uploadInterviewQuestionB btn btn-lg">Review Recording</button>
                <button style={{marginLeft: "2%"}} onClick={this.uploadToAWS} className="uploadInterviewQuestionB btn btn-lg">Save Recording</button>
            </div>
        );
        return (
            <div>
                    <div className="row pulsingDotRow">
                        <div className="col-md-3">
                            {recording}
                        </div>
                    </div>
                    <div id="webcamContainer" className="row">
                        <div className="col-md-10 col-md-offset-2">
                            <video autoPlay="true" id="uploadVideo">

                            </video>
                        </div>
                    </div>
                    <div className="row text-center">
                        {button}
                    </div>
            </div>

        );

    }
}

UploadVideoComponent.propTypes = {
    ServerActions: PropTypes.object.isRequired,
    WebcamAndVideoActions: PropTypes.object.isRequired,
    streamingObject: PropTypes.object.isRequired,
    UserActions: PropTypes.object.isRequired,
    employerId: PropTypes.string,
    userId: PropTypes.string,
    jobId: PropTypes.string
};

function mapStateToProps(state, ownProps) {
    let streamingObject, employerId, jobId, userId, clearLocalState;
    if (ownProps.streamObject) streamingObject = ownProps.streamObject;
    if (ownProps.employerId) employerId = ownProps.employerId;
    if (ownProps.jobId) jobId = ownProps.jobId;
    if (ownProps.userId) userId = ownProps.userId;
    if (ownProps.clearLocalState) clearLocalState = ownProps.clearLocalState;
    return {
        streamingObject,
        jobId,
        employerId,
        userId,
        clearLocalState
    };
}

function mapDispatchToProps(dispatch) {
    return {
        UserActions: bindActionCreators(UserActions, dispatch),
        WebcamAndVideoActions: bindActionCreators(WebcamAndVideoActions, dispatch),
        ServerActions: bindActionCreators(ServerActions, dispatch)
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(UploadVideoComponent);