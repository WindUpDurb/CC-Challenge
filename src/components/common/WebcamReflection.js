"use strict";

import React, {PropTypes} from "react";
import {connect} from "react-redux";
import * as UserActions from "../../actions/UserActions";
import {bindActionCreators} from "redux";

class WebcamReflection extends React.Component {

    constructor(props) {
        super(props);

        this.state ={
            streamObject: null
        };

        this.beginRecording = this.beginRecording.bind(this);
        this.requestWebcamPermission = this.requestWebcamPermission.bind(this);
    }

    beginRecording() {
        console.log(this.state.streamObject);
        let recorder = new MediaRecorder(this.state.streamObject);
        recorder.start();
        recorder.requestData();
        console.log("Recording has started");
        console.log("Recorder: ", recorder);
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


    render() {
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
            </div>
        );

    }
}

WebcamReflection.propTypes = {
    UserActions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return {
        UserActions: bindActionCreators(UserActions, dispatch)
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(WebcamReflection);