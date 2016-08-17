"use strict";

import React, {PropTypes} from "react";
import {connect} from "react-redux";
import * as UserActions from "../../actions/UserActions";
import {bindActionCreators} from "redux";

class WebcamReflection extends React.Component {

    constructor(props) {
        super(props);

        this.state ={
            streamObject: null,
            recordingObject: null,
            buffer: null,
            file: null,
            dataUrl: null
        };

        this.beginRecording = this.beginRecording.bind(this);
        this.requestWebcamPermission = this.requestWebcamPermission.bind(this);
        this.endRecording = this.endRecording.bind(this);
        this.onDataAvailable = this.onDataAvailable.bind(this);
        this.bufferToDataUrl = this.bufferToDataUrl.bind(this);
        this.dataUrlToFile = this.dataUrlToFile.bind(this);
        this.playFromNewlyRecorded = this.playFromNewlyRecorded.bind(this);
        this.uploadToAWS = this.uploadToAWS.bind(this);
    }

    beginRecording() {
        console.log(this.state.streamObject);
        let recorder = new MediaRecorder(this.state.streamObject);
        recorder.ondataavailable = this.onDataAvailable;
        recorder.start();
        this.setState({recordingObject: recorder});
    }

    onDataAvailable(event) {
        if(event.data) {
            let buffer = [];
            if (this.state.buffer) buffer = [...this.state.buffer];
            console.log("check: ", buffer);
            buffer.push(event.data);
            this.setState({buffer});
        }
    }

    endRecording() {
        let recordingObject = this.state.recordingObject;
        recordingObject.stop();
        //ends the feed below
        recordingObject.stream.getTracks().forEach(function(track) {track.stop();});
        console.log("Recording end");
        console.log("blog: ", this.state.buffer);
        this.bufferToDataUrl((dataUrl, blob) => {
            let file = this.dataUrlToFile(dataUrl);
            this.setState({file});
            this.setState({dataUrl});
            console.log("File: ", file);

            //to download file
            /*let url = URL.createObjectURL(blob),
                el = document.createElement("a");

            document.body.appendChild(el);
            el.style = "display:none";
            el.href = url;
            el.download = "video.webm";
            el.click();
            URL.revokeObjectURL(url);*/
        });
    }

    playFromNewlyRecorded() {
        console.log("Before play")
        console.log("file: ", this.state.file)
        let video = document.querySelector("video");
        video.src = this.state.dataUrl;
        video.type = "video/webm";
        console.log("Video object: ", video)

        video.play();
        //video.onloadedmetadata = e => {video.play();
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

    bufferToDataUrl(callback) {
        let blob = new Blob(this.state.buffer, {
            type: "video/webm"
        });

        let reader = new FileReader();
        reader.onload = function() {
            callback(reader.result, blob);
        };
        reader.readAsDataURL(blob);
    }

    dataUrlToFile(dataUrl) {
        let binary = atob(dataUrl.split(",")[1]);
        let data = [];
        for (let i = 0; i < binary.length; i++) {
            data.push(binary.charAt(i));
        }
        return new File([new Uint8Array(data)],'recorded-video.webm', {
            type: 'video/webm'
        });
    }

    uploadToAWS() {
        this.props.UserActions.uploadToAWS(this.state.file);
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
                <button onClick={this.playFromNewlyRecorded}>Play from Recorded</button>
                <button onClick={this.uploadToAWS}>Upload</button>
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