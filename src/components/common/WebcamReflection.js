"use strict";

import React, {PropTypes} from "react";
import {connect} from "react-redux";
import * as UserActions from "../../actions/UserActions";
import * as ServerActions from "../../actions/ServerActions";
import {bindActionCreators} from "redux";
import {ReplayVideo} from "./ReplayVideo";

class WebcamReflection extends React.Component {

    constructor(props) {
        super(props);

        this.state ={
            streamObject: null,
            recordingObject: null,
            buffer: null,
            dataUrl: null,
            readerResult: null,
            blobToUpload: null
        };

        this.beginRecording = this.beginRecording.bind(this);
        this.requestWebcamPermission = this.requestWebcamPermission.bind(this);
        this.endRecording = this.endRecording.bind(this);
        this.onDataAvailable = this.onDataAvailable.bind(this);
        this.bufferToDataUrl = this.bufferToDataUrl.bind(this);
        this.playFromNewlyRecorded = this.playFromNewlyRecorded.bind(this);
        this.uploadToAWS = this.uploadToAWS.bind(this);
    }

    beginRecording() {
        console.log(this.state.streamObject);
        let options = {mimeType: "video/webm"};
        let recorder = new MediaRecorder(this.state.streamObject, options);
        recorder.ondataavailable = this.onDataAvailable;
        recorder.start();
        this.setState({recordingObject: recorder});
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

    requestWebcamPermission() {
        let constraints = {
            audio: true,
            video: {
                height: {ideal: 720},
                width: {ideal: 1280}
            }
        };
        navigator.mediaDevices.getUserMedia(constraints)
            .then(stream => {
                let video = document.querySelector("video");
                video.src = window.URL.createObjectURL(stream);
                video.onloadedmetadata = e => video.play();
                this.setState({streamObject: stream});
            })
            .catch(error => {
                console.log("Error: ", error);
            });
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
        this.props.ServerActions.uploadToAWS(this.state.blobToUpload);
    }



    render() {
        let replayVideo;
        if (this.state.readerResult) replayVideo = <ReplayVideo source={this.state.readerResult}/>
        return (
            <div className="container-fluid">
                <div id="webcamContainer">
                    <video autoPlay="true" id="videoElement">

                    </video>
                </div>
                <button className="button"
                        onClick={this.requestWebcamPermission}>Request</button>
                <button onClick={this.beginRecording}>Begin</button>
                <button onClick={this.endRecording}>End</button>
                <button onClick={this.playFromNewlyRecorded}>Play from Recorded</button>
                <button onClick={this.uploadToAWS}>Upload</button>
                <div>
                    {replayVideo}
                </div>
            </div>
        );

    }
}

WebcamReflection.propTypes = {
    ServerActions: PropTypes.object.isRequired,
    UserActions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return {
        UserActions: bindActionCreators(UserActions, dispatch),
        ServerActions: bindActionCreators(ServerActions, dispatch)
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(WebcamReflection);
